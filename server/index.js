import express from "express";
import React from 'react';
import { StaticRouter } from "react-router-dom/server";
import App from "../client/App.jsx";
import {renderToString} from "react-dom/server";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackBrowserConfig from '../config/webpack.client.dev.config';
import util from 'util';
import fs from 'fs';

const getAssets = (manifest) => {
    const jsAssets = [];

    for (let asset in manifest) {
        const isJsAsset = new RegExp(/.js$/);

        if (isJsAsset.test(asset)) {
            jsAssets.push(manifest[asset]);
        }
    }

    return jsAssets;
};

const compiler = webpack(webpackBrowserConfig);
const app = express();

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackBrowserConfig.output.publicPath
    })
);

app.use(
    webpackHotMiddleware(compiler, {
        log: console.info,
        path: '/__webpack_hmr',
        heartbeat: 5000
    })
);

app.get("*", async (req, res) => {
    const fsReadPromise = util.promisify(fs.readFile);

    const filePayload = await fsReadPromise(`${process.cwd()}/manifest.json`);
    const manifest = JSON.parse(filePayload);

    const assets = getAssets(manifest);

    const jsAssets = assets.reduce(
        (prev, asset) =>
            (prev += `<script type="text/javascript" charset="utf-8" src="${asset}"></script>`),
        ''
    );

    let app = renderToString(
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    );

    const html = `<!DOCTYPE html>
        <html>
            <head>
                <title>Server Rendered App (renderToString)</title>
            </head>
            <body>
                <div id="root">${app}</div>
                ${jsAssets}
            </body>
        </html>
    `;

    res.send(html);
});

app.listen(3000);
