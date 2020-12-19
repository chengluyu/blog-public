const moment = require("moment")

module.exports = function (plop) {
  plop.setGenerator("post", {
    description: "blog post",
    prompts: [
      {
        type: "input",
        name: "title",
        message: "Title",
      },
      {
        type: "list",
        name: "language",
        message: "Language",
        choices: ["en", "zh-Hans"],
      },
      {
        type: "input",
        name: "tags",
        message: "Tags (separated by comma)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "data/posts/{{kebabCase title}}.md",
        templateFile: "data/posts/template.md.hbs",
        // You can get it by `date +'%Y-%m-%dT%H:%M:%S+08:00'`
        data: () => ({ date: moment().format("YYYY-MM-DDTHH:mm:ssZ") }),
      },
    ],
  })
}
