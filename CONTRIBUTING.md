# Contributing to ngx-multiselect-dropdown

First off, thank you for considering contributing to **ngx-multiselect-dropdown**! 🎉

This Angular multiselect dropdown component is a community-driven project, and we welcome contributions from developers of all skill levels. Whether you're fixing a bug, adding a feature, improving documentation, or reporting an issue, your contribution is valuable.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Documentation](#documentation)

## 📜 Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [your.email@example.com].

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/noble-wave/ngx-multiselect-dropdown/issues) to avoid duplicates. When creating a bug report, include:

- **Clear descriptive title**
- **Angular version** you're using
- **Browser and OS** information
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Code sample** or minimal reproduction (StackBlitz/CodeSandbox)
- **Screenshots** if applicable

### Suggesting Features

Feature requests are welcome! Before submitting:

1. Check if the feature has already been requested
2. Provide a clear use case
3. Explain how it benefits the Angular community
4. Consider if it fits the library's scope

### Submitting Pull Requests

We actively welcome pull requests for:

- Bug fixes
- New features
- Documentation improvements
- Performance enhancements
- Accessibility improvements
- Test coverage improvements

## 🛠️ Development Setup

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn** / **pnpm**)
- **Git**
- Basic knowledge of **Angular**, **TypeScript**, and **RxJS**

### Getting Started

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/noble-wave/ngx-multiselect-dropdown.git
   cd ngx-multiselect-dropdown
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/noble-wave/ngx-multiselect-dropdown.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start development server**:
   ```bash
   npm start
   ```
   
   The demo app will open at `http://localhost:4200`

### Project Structure

```
ngx-multiselect-dropdown/
├── src/
│   ├── lib/                    # Library source code
│   │   ├── components/         # Angular components
│   │   ├── directives/         # Custom directives
│   │   ├── models/             # TypeScript interfaces/types
│   │   ├── pipes/              # Angular pipes
│   │   └── services/           # Angular services
│   └── app/                    # Demo application
├── public/                     # Static assets
├── README.md                   # Main documentation
└── package.json               # Project configuration
```

## 🔄 Development Workflow

### Creating a Branch

Always create a new branch for your work:

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### Making Changes

1. **Write clean, readable code** following our coding guidelines
2. **Add tests** for new features or bug fixes
3. **Update documentation** if needed
4. **Run tests** to ensure nothing breaks:
   ```bash
   npm test
   ```
5. **Check TypeScript compilation**:
   ```bash
   npm run build
   ```

### Testing Your Changes

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Test the build
npm run build
```

## 📏 Coding Guidelines

### TypeScript Style

- Use **TypeScript strict mode**
- Follow the [Angular Style Guide](https://angular.io/guide/styleguide)
- Use **meaningful variable and function names**
- Add **JSDoc comments** for public APIs
- Use **type annotations** explicitly when type inference is unclear

### Angular Best Practices

- Use **Angular Signals** for state management
- Implement **standalone components**
- Use **OnPush change detection** where applicable
- Follow **reactive programming** principles with RxJS
- Ensure **accessibility** (ARIA attributes, keyboard navigation)
- Write **mobile-friendly** code

### Code Formatting

We use **Prettier** for code formatting. Format your code before committing:

```bash
npm run format
```

### Linting

Ensure your code passes linting:

```bash
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(dropdown): add virtual scrolling support

fix(search): resolve search filter case sensitivity issue

docs(readme): update installation instructions

test(component): add tests for keyboard navigation
```

## 🔀 Pull Request Process

1. **Update your branch** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title following commit message guidelines
   - Detailed description of changes
   - Reference to related issues (e.g., "Closes #123")
   - Screenshots/GIFs for UI changes
   - Breaking changes noted (if any)

4. **Respond to review comments** promptly

5. **Ensure CI checks pass**:
   - All tests pass
   - Build succeeds
   - No linting errors
   - Code coverage maintained

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass locally
- [ ] No console warnings or errors
- [ ] Backward compatibility maintained (or breaking change noted)

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Angular version: [e.g., 17.0.0]
- ngx-multiselect-dropdown version: [e.g., 1.0.0]
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]

**Additional context**
Any other relevant information.
```

## ✨ Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
Your proposed solution.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Use case**
How would this feature be used?

**Additional context**
Any mockups, examples, or references.
```

## 📖 Documentation

Good documentation is crucial! You can contribute by:

- Improving the README
- Adding code examples
- Creating tutorials or blog posts
- Fixing typos or unclear explanations
- Translating documentation

### Documentation Style

- Use clear, concise language
- Include code examples
- Add TypeScript type annotations
- Provide real-world use cases
- Keep examples up-to-date with Angular versions

## 🏆 Recognition

Contributors will be:

- Listed in the project's contributors section
- Mentioned in release notes for significant contributions
- Credited in the README for major features

## 📞 Getting Help

Need help or have questions?

- **GitHub Discussions**: [Start a discussion](https://github.com/noble-wave/ngx-multiselect-dropdown/discussions)
- **GitHub Issues**: [Browse existing issues](https://github.com/noble-wave/ngx-multiselect-dropdown/issues)
- **Stack Overflow**: Tag questions with `ngx-multiselect-dropdown` and `angular`

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

## 🙏 Thank You!

Your contributions help make ngx-multiselect-dropdown better for the entire Angular community. Every contribution, no matter how small, is valuable and appreciated! 🚀

**Happy coding!** 💻✨
