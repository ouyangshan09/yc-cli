/**
 * Created by Ouyang on 2018/3/29.
 * 创建组件模板模块
 * @author Ouyang
 */
const fs = require('fs');
const path = require('path');

/** 读取文件 */
function readFile (path, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            encoding ? resolve(Buffer.from(data, encoding).toString()) : resolve(data);
        });
    })
}

/** 输出文件 */
function outputFile (path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf8', err => {
            if (err) reject(err);
            resolve(`output path${path} success`);
        });
    });
}

/**
 * 创建文件目录
 * dirPath 文件夹
 * name 目录名称
 * */
function createFolder (dirPath, name) {
    return new Promise((resolve, reject) => {
        const folderPath = path.join(dirPath, name);
        if (fs.existsSync(folderPath)) {
            resolve({status: false, err: 'folder is exists'});
        }
        fs.mkdir(folderPath, err => {
            if (err) reject({status: false, err: err});
            resolve({status: true});
        });
    });
}

const componentExp = new RegExp(/{{\/([^{}]+)}}/, 'g');

function mapTemplateNameToVariables (key, value) {
    if (key === 'componentName') {
        return value;
    }
}

/**
 * 名字替换模板Key
 * */
function replaceTemplateKeyByName (str = '', name) {
    return str.replace(componentExp, (match, pattern, offset) => {
        return mapTemplateNameToVariables(pattern, name);
    })
}

const root = path.join(__dirname, '../');
const componentTemplatePath = path.join(root, 'template', 'component');


/**
 * 创建组件模板
 * */
async function generateComponent (dir, componentName) {
    const entry = await readFile(path.join(componentTemplatePath, 'index.js'), 'utf8');
    const style = await readFile(path.join(componentTemplatePath, 'style.scss'), 'utf8');
    const component = await readFile(path.join(componentTemplatePath, 'reactComponent.js'), 'utf8');
    const { status } = await createFolder(dir, componentName);
    const outputFolder = path.join(dir, componentName);
    if (status) {
        return Promise.all([
            outputFile(path.join(outputFolder, 'index.js'), replaceTemplateKeyByName(entry, componentName)),
            outputFile(path.join(outputFolder, `${componentName}.scss`), replaceTemplateKeyByName(style, componentName)),
            outputFile(path.join(outputFolder, `${componentName}.js`), replaceTemplateKeyByName(component, componentName))
        ]).then(() => ({message: 'component create success', status: true}))
    } else {
        return Promise.reject({message: `folder name${componentName} exists, dirPath: ${outputFolder}`, status: false});
    }
}

async function create (componentName, options) {
    // console.log('componentName:', componentName);
    return generateComponent(process.cwd(), componentName);
}

module.exports = (...args) => {
    create(...args).catch(err => {
        console.log('create component fail');
        process.exit(1);
    })
};
