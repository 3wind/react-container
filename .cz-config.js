module.exports = {
  types: [
    {
      value: "feat",
      name: "feat:   添加新功能",
    },
    {
      value: "fix",
      name: "fix:   修复Bug",
    },
    {
      value: "chore",
      name:
        "chore:   不修改src或者test的其余修改，例如构建过程或辅助工具的变动",
    },
    {
      value: "perf",
      name: "perf:   性能优化",
    },
    {
      value: "refactor",
      name: "refactor:   代码重构",
    },
  ],
  messages: {
    type: "选择要提交的更改类型:",
    scope: "填写需求名称:",
    customScope: "选择更改影响的范围:",
    subject: "写一个简短、命令时态的语句来描述更改:\n",
    body: '详细描述更改原因 (可选，按回车跳过). 使用 "|" 来换行:\n',
    breaking: "列出 BREAKING CHANGES (可选，按回车跳过):\n",
    footer: "列出这次更改关闭的 ISSUES (可选，按回车跳过). 如: #31, #34:\n",
    confirmCommit: "确定提交上面的更改?",
  },
  skipQuestions: ["customScope", "footer"],
  footerPrefix: "close",
};
