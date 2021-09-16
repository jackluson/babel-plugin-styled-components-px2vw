/*
 * Desc:
 * File: /src/index.ts
 * Project: node-typescript-template
 * File Created: Saturday, 3rd April 2021 1:26:29 pm
 * Author: luxuemin2108@gmail.com
 * -----
 * Copyright (c) 2021 Camel Lu
 */
import { ConfigAPI } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';
import { Visitor, NodePath } from '@babel/traverse';
import createPx2vw from './createPx2vw';
import {
  TaggedTemplateExpression,
  CallExpression,
  isIdentifier,
  isMemberExpression,
  isCallExpression,
  Identifier,
  isArrowFunctionExpression,
  TemplateLiteral,
  MemberExpression,
  TemplateElement,
  Expression,
  isTemplateElement,
  callExpression,
  identifier,
  Program,
  isBlock,
  arrowFunctionExpression,
  isConditionalExpression,
  StringLiteral,
  BinaryExpression,
  NumericLiteral,
  isBinaryExpression,
  isStringLiteral,
  LogicalExpression,
  isLogicalExpression,
  isNumericLiteral,
  isFunctionExpression,
  restElement,
  spreadElement,
  OptionalMemberExpression,
  isOptionalMemberExpression,
  OptionalCallExpression,
  isOptionalCallExpression,
  SpreadElement,
  JSXNamespacedName,
  ArgumentPlaceholder,
} from '@babel/types';
import configuration, { IConfiguration } from './configuration';
import { replace } from './replace';

let _px2vw: Identifier | undefined;
let _used = false;

function isStyledTagged(tagged: TaggedTemplateExpression) {
  const tag = tagged.tag;
  if (isIdentifier(tag)) {
    return isStyled(tag);
  } else if (isMemberExpression(tag)) {
    return isStyledMember(tag);
  } else if (isCallExpression(tag)) {
    return isStyledFunction(tag);
  }
  return false;
}

function isStyledMember(member: MemberExpression): boolean {
  if (isIdentifier(member.object)) {
    return isStyled(member.object);
  } else if (isMemberExpression(member.object)) {
    return isStyledMember(member.object);
  }
  return false;
}

function isStyledFunction(call: CallExpression): boolean {
  const callee = call.callee;
  if (isMemberExpression(callee)) {
    return isStyledMember(callee);
  } else if (isIdentifier(callee)) {
    return isStyled(callee);
  } else if (isCallExpression(callee)) {
    return isStyledFunction(callee);
  }
  return false;
}

function isStyled(id: Identifier): boolean {
  return configuration.config.tags.indexOf(id.name) >= 0;
}

function isPureExpression(
  node: any,
): node is
  | Identifier
  | CallExpression
  | OptionalCallExpression
  | BinaryExpression
  | StringLiteral
  | NumericLiteral
  | MemberExpression
  | OptionalMemberExpression
  | LogicalExpression {
  return (
    isIdentifier(node) ||
    isCallExpression(node) ||
    isOptionalCallExpression(node) ||
    isBinaryExpression(node) ||
    isStringLiteral(node) ||
    isNumericLiteral(node) ||
    isMemberExpression(node) ||
    isOptionalMemberExpression(node) ||
    isLogicalExpression(node)
  );
}

function createCallPx2vw(
  px2vw: Identifier,
  ...expressions: (Expression | SpreadElement | JSXNamespacedName | ArgumentPlaceholder)[]
): CallExpression {
  _used = true;
  return callExpression(px2vw, expressions);
}

function transformTemplateExpression(expression: Expression, px2vw: Identifier): Expression {
  if (isArrowFunctionExpression(expression)) {
    if (isBlock(expression.body)) {
      expression.body = createCallPx2vw(px2vw, arrowFunctionExpression([], expression.body));
    } else if (isPureExpression(expression.body)) {
      expression.body = createCallPx2vw(px2vw, expression.body);
    } else {
      expression.body = transformTemplateExpression(expression.body, px2vw);
    }
  } else if (isConditionalExpression(expression)) {
    expression.alternate = transformTemplateExpression(expression.alternate, px2vw);
    expression.consequent = transformTemplateExpression(expression.consequent, px2vw);
  } else if (isFunctionExpression(expression)) {
    return arrowFunctionExpression(
      [restElement(identifier('args'))],
      createCallPx2vw(px2vw, expression, spreadElement(identifier('args'))),
    );
  } else {
    return createCallPx2vw(px2vw, expression);
  }

  return expression;
}

function transform(template: TemplateLiteral): void {
  if (_px2vw) {
    const expressions: (Expression | TemplateElement)[] = [
      ...(template.expressions as Expression[]),
      ...template.quasis,
    ];
    expressions.sort((it1, it2) => (it1.start || 0) - (it2.start || 0));
    for (let i = 0; i < expressions.length; i++) {
      const expression = expressions[i];
      if (isTemplateElement(expression)) continue;
      const next = expressions[i + 1];
      if (next && isTemplateElement(next)) {
        const text = next.value?.raw || next.value?.cooked;
        const regUnit = new RegExp(`^${configuration.config.unitToConvert}`);
        if (text && regUnit.test(text)) {
          const idx = template.expressions.findIndex((it) => it === expression);
          if (idx !== -1) {
            template.expressions[idx] = transformTemplateExpression(expression, _px2vw);
            if (next.value && next.value.raw) {
              next.value.raw = next.value.raw.replace(regUnit, '');
            }
            if (next.value && next.value.cooked) {
              next.value.cooked = next.value.cooked.replace(regUnit, '');
            }
          }
        }
      }
    }
  }
}

export default declare((api: ConfigAPI, options?: IConfiguration) => {
  api.assertVersion(7);
  configuration.updateConfig(options);
  const templateVisitor: Visitor = {
    TemplateElement(path: NodePath<TemplateElement>) {
      const it = path.node;
      if (it.value && it.value.raw) {
        it.value.raw = replace(it.value.raw);
      }
      if (it.value && it.value.cooked) {
        it.value.cooked = replace(it.value.cooked);
      }
    },
    StringLiteral(path: NodePath<StringLiteral>) {
      path.node.value = replace(path.node.value);
    },
  };

  if (configuration.config.transformRuntime) {
    templateVisitor.TemplateLiteral = (path: NodePath<TemplateLiteral>) => {
      transform(path.node);
    };
  }
  const visitor: Visitor = {
    Program: {
      exit(programPath: NodePath<Program>) {
        if (_used && _px2vw) {
          programPath.node.body.push(createPx2vw(_px2vw, configuration.config));
        }
      },
      enter(programPath: NodePath<Program>, pluginPass: Record<string, any>) {
        const {
          file: {
            opts: { sourceFileName },
          },
        } = pluginPass;

        const exclude = configuration.config.exclude;
        const include = configuration.config.include;

        if (include && sourceFileName) {
          if (include instanceof RegExp) {
            if (!include.test(sourceFileName)) return;
          } else if (exclude instanceof Array) {
            let flag = false;
            for (let i = 0; i < include.length; i++) {
              if (include[i].test(sourceFileName)) {
                flag = true;
                break;
              }
            }
            if (!flag) return;
          }
        }

        if (exclude && sourceFileName) {
          if (exclude instanceof RegExp) {
            if (exclude.test(sourceFileName)) return;
          } else if (exclude instanceof Array) {
            for (let i = 0; i < exclude.length; i++) {
              if (exclude[i].test(sourceFileName)) return;
            }
          }
        }
        if (configuration.config.transformRuntime) {
          _px2vw = programPath.scope.generateUidIdentifier('px2vw');
        } else {
          _px2vw = undefined;
        }
        _used = false;
        programPath.traverse({
          TaggedTemplateExpression(path: NodePath<TaggedTemplateExpression>) {
            if (isStyledTagged(path.node)) {
              path.traverse(templateVisitor);
            }
          },
          CallExpression(path: NodePath<CallExpression>) {
            if (isStyledFunction(path.node)) {
              path.traverse(templateVisitor);
            }
          },
        });
      },
    },
  };

  return {
    name: 'styled-components-px2vw',
    visitor,
  };
});
