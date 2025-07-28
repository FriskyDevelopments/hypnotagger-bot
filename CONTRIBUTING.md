# 🎭 Contributing to HypnoTagger Bot

Thank you for your interest in contributing to HypnoTagger Bot! We welcome contributions from developers of all skill levels.

## 🌟 Code of Conduct

### Our Standards

- **Be Respectful**: Treat everyone with kindness and respect
- **Be Inclusive**: Welcome newcomers and diverse perspectives  
- **Be Collaborative**: Work together constructively
- **Be Professional**: Keep discussions focused and productive

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Publishing private information without permission
- Any conduct that would be inappropriate in a professional setting

## 🚀 Getting Started

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/hypnotagger-bot.git
   cd hypnotagger-bot
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment**:

   ```bash
   cp .env.example .env
   # Edit .env with your test bot credentials
   ```

5. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style

- Use **2 spaces** for indentation
- Follow **camelCase** for variable names
- Use **descriptive variable names**
- Add **JSDoc comments** for functions
- Keep **functions small and focused**

### Example Code Style

```javascript
/**
 * Generates hashtags from video metadata
 * @param {string} content - Video title and description
 * @returns {string[]} Array of generated hashtags
 */
function generateHashtags(content) {
  const cleanContent = content.toLowerCase().trim();
  // Implementation here...
}
```

### Testing

- Test your changes thoroughly before submitting
- Ensure the bot responds correctly to various inputs
- Test error handling scenarios
- Verify cleanup of temporary files

### Commit Guidelines

Use clear, descriptive commit messages:

```bash
# Good examples
git commit -m "Add support for Instagram video downloads"
git commit -m "Fix memory leak in video processing"
git commit -m "Improve error messages for invalid URLs"

# Avoid
git commit -m "fix stuff"
git commit -m "updates"
```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to recreate the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node.js version, etc.
6. **Logs**: Any relevant error messages or logs

### Feature Requests

For feature requests, please provide:

1. **Problem Statement**: What problem does this solve?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other approaches you've considered
4. **Use Cases**: Real-world scenarios where this would be useful

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Changes have been tested thoroughly
- [ ] Documentation has been updated if needed
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up to date with main branch

### Pull Request Template

Please include in your PR description:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests pass

## Screenshots/Logs
If applicable, add screenshots or logs
```

### Review Process

1. **Automated Checks**: Ensure all CI checks pass
2. **Code Review**: Wait for maintainer review
3. **Address Feedback**: Make requested changes
4. **Approval**: Get approval from maintainers
5. **Merge**: Changes will be merged to main branch

## 🏷️ Areas for Contribution

### High Priority

- **Performance Optimization**: Improve video processing speed
- **Error Handling**: Better error messages and recovery
- **Security**: Input validation and sanitization
- **Documentation**: Improve guides and examples

### Medium Priority

- **New Features**: Additional video platforms support
- **UI/UX**: Better bot interaction design
- **Testing**: Automated test coverage
- **Monitoring**: Health checks and metrics

### Good for Beginners

- **Documentation**: Fix typos, improve clarity
- **Code Cleanup**: Refactor repetitive code
- **Examples**: Add usage examples
- **Configuration**: Environment variable improvements

## 🎨 Design Philosophy

### Core Principles

1. **Simplicity**: Keep the interface clean and intuitive
2. **Reliability**: Prioritize stability over features
3. **Performance**: Optimize for speed and efficiency
4. **Security**: Always validate and sanitize inputs
5. **Maintainability**: Write code that's easy to understand

### Color Scheme

Our project uses a distinctive color palette:

- **Primary**: `#ff6b6b` (Coral Red)
- **Secondary**: `#4ecdc4` (Turquoise)
- **Accent**: `#45b7d1` (Sky Blue)
- **Success**: `#96ceb4` (Mint Green)
- **Warning**: `#ffeaa7` (Light Yellow)
- **Error**: `#fd79a8` (Pink)

## 📚 Resources

### Documentation

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [yt-dlp Documentation](https://github.com/yt-dlp/yt-dlp)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### Tools

- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [Postman](https://www.postman.com/) - API testing
- [ngrok](https://ngrok.com/) - Local webhook testing

## 🤝 Community

### Getting Help

- **GitHub Issues**: Technical questions and bug reports
- **Discussions**: Feature ideas and general questions
- **Code Review**: Feedback on pull requests

### Recognition

Contributors will be recognized in:

- **README.md**: Contributors section
- **Release Notes**: Feature contributions
- **GitHub**: Contributor badges

## 📄 License

By contributing to HypnoTagger Bot, you agree that your contributions will be licensed under the MIT License.

---

## 🎉 Thank you for contributing

Your contributions help make HypnoTagger Bot better for everyone. Whether it's code, documentation, bug reports, or feature ideas - every contribution matters!
