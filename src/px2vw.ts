export const px2vw = `
function %%px2vw%%(%%input%%) {
    if (typeof %%input%% === 'function') return %%px2vw%%(%%input%%());
    var value = typeof %%input%% === 'string' ? parseFloat(%%input%%) : typeof %%input%% === 'number' ? %%input%% : 0;
    var pixels = Number.isNaN(value) ? 0 : value;
    if (pixels < %%minPixelValue%%) {
        return \`\${pixels}px\`;
    }
    var mul = Math.pow(10, %%unitPrecision%% + 1);
    return \`\${Math.round(Math.floor(pixels * 100 / %%viewportWidth%% * mul) / 10) * 10 / mul}vw\`;
}
`;
