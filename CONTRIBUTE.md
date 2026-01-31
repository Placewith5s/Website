## Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process
1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Maintain the formatting as much as you can. [Formatting section](#formatting)
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Formatting
- Files shouldn't have manual obfuscation
- One liners - 60 characters limit. (applies to everyting). Exceptions: URLs. [Character counter](https://wordcounter.net/character-count)
- Unnecessary framework usage that isn't already included won't be accepted

Code comments
- Explanatory code comments aren't allowed
- Everything else doesn't apply to code comments

HTML
- Both Inline & style blocks won't be accepted. Exception: Dynamically added or third-party apps
- Any usage of b and br won't be accepted. Use CSS instead

CSS
- Properties: Alphabetical order
- If a selector is only inside main, selector should start with main (main .selector)
- Selector should NEVER be body. Exception: body as the only selector (body)

JavaScript
- Do not manually edit generated JavaScript files; modify the source (TypeScript) instead

TypeScript
- A function next to a function - Exactly 1 newline. Exception: First function of script - Exactly 2 newlines

### Get missing dependencies
- After cloning, install them by running the following:
```
npm install
```