import { identifier, Identifier, stringLiteral, numericLiteral, Statement } from '@babel/types';
import templateBuild from '@babel/template';
import { IConfiguration } from './configuration';

export const source = `
function %%px2vw%%(%%input%%, ...args) {
    if (typeof %%input%% === 'function') return %%px2vw%%(%%input%%(...args), ...args);
    var value = typeof %%input%% === 'string' ? parseFloat(%%input%%) : typeof %%input%% === 'number' ? %%input%% : 0;
    var pixels = Number.isNaN(value) ? 0 : value;
    if (Math.abs(pixels) < %%minPixelValue%%) {
        return \`\${pixels}px\`;
    }
    var unit = %%viewportUnit%%;
    var mul = Math.pow(10, %%unitPrecision%% + 1);
    return \`\${Math.round(Math.floor(pixels * 100 / %%viewportWidth%% * mul) / 10) * 10 / mul }\${unit}\`;
}
`;

export type IPx2vwOptions = Pick<IConfiguration, 'viewportWidth' | 'unitPrecision' | 'viewportUnit' | 'minPixelValue'>;

export default (_px2vw: Identifier, config: IPx2vwOptions): Statement => {
  const template = templateBuild.statement(source);
  return template({
    input: identifier('input'),
    px2vw: _px2vw,
    viewportWidth: numericLiteral(config.viewportWidth),
    unitPrecision: numericLiteral(config.unitPrecision),
    viewportUnit: stringLiteral(config.viewportUnit),
    minPixelValue: numericLiteral(config.minPixelValue),
  });
};
