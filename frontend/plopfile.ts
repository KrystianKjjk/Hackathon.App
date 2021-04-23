module.exports = (plop) => {
    plop.setGenerator("FC", {
        description: "Create a functional component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is your component name",
            },
        ],
        actions: [
            {
                type: "add",
                path:
                    "src/Components/{{pascalCase name}}/{{pascalCase name}}.tsx",
                templateFile: "plop-templates-TS/functionalComponent.tsx.hbs",
            },
            {
                type: "add",
                path:
                    "src/Components/{{pascalCase name}}/{{pascalCase name}}-style.tsx",
                templateFile: "plop-templates-TS/Component-style.tsx.hbs",
            },
            {
                type: "add",
                path: "src/components/{{pascalCase name}}/index.ts",
                templateFile: "plop-templates-TS/injectable-index.ts.hbs",
            },
        ],
    });
    plop.setGenerator("PC", {
        description: "Create a functional component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is your component name",
            },
        ],
        actions: [
            {
                type: "add",
                path: "src/Pages/{{pascalCase name}}/{{pascalCase name}}.tsx",
                templateFile: "plop-templates-TS/functionalComponent.tsx.hbs",
            },
            {
                type: "add",
                path:
                    "src/Pages/{{pascalCase name}}/{{pascalCase name}}-style.tsx",
                templateFile: "plop-templates-TS/Component-style.tsx.hbs",
            },
            {
                type: "add",
                path: "src/Pages/{{pascalCase name}}/index.ts",
                templateFile: "plop-templates-TS/injectable-index.ts.hbs",
            },
        ],
    });

    plop.setGenerator("FCM", {
        description: "Create a functional component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is your component name",
            },
        ],
        actions: [
            {
                type: "add",
                path:
                    "src/Components/{{pascalCase name}}/{{pascalCase name}}.tsx",
                templateFile:
                    "plop-templates-TS/functionalComponentModule.tsx.hbs",
            },
            {
                type: "add",
                path:
                    "src/Components/{{pascalCase name}}/{{pascalCase name}}.module.css",
                templateFile: "plop-templates-TS/Component.module.css.hbs",
            },
            {
                type: "add",
                path: "src/components/{{pascalCase name}}/index.ts",
                templateFile: "plop-templates-TS/injectable-index.ts.hbs",
            },
        ],
    });
    plop.setGenerator("PCM", {
        description: "Create a functional page component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is your component name",
            },
        ],
        actions: [
            {
                type: "add",
                path: "src/Pages/{{pascalCase name}}/{{pascalCase name}}.tsx",
                templateFile:
                    "plop-templates-TS/functionalComponentModule.tsx.hbs",
            },
            {
                type: "add",
                path:
                    "src/Pages/{{pascalCase name}}/{{pascalCase name}}.module.css",
                templateFile: "plop-templates-TS/Component.module.css.hbs",
            },
            {
                type: "add",
                path: "src/Pages/{{pascalCase name}}/index.ts",
                templateFile: "plop-templates-TS/injectable-index.ts.hbs",
            },
        ],
    });
};
