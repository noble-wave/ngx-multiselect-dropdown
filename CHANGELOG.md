# Changelog

All notable changes to **ngx-multiselect-dropdown** - the modern Angular multiselect dropdown component - will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features
- Virtual scrolling for large datasets (10,000+ items)
- Custom item templates support
- Group selection functionality
- Multi-level dropdown support
- Drag and drop for reordering selected items
- Export selected items (CSV, JSON)
- Advanced filtering options
- Lazy loading support
- Server-side search integration
- RTL (Right-to-Left) language support

## [1.0.0] - TBD

### 🎉 Initial Release

The first stable release of ngx-multiselect-dropdown - a modern Angular multiselect dropdown component built with Signals and standalone architecture.

### ✨ Features

#### Core Functionality
- **Angular 17+ Support** with Signals and standalone components
- **Zero Dependencies** - Lightweight implementation (~5KB gzipped)
- **Forms Integration** - Full `ControlValueAccessor` implementation
  - Reactive Forms support (`FormControl`, `FormGroup`)
  - Template-driven forms support (`ngModel`)
  - Validation support (required, custom validators)
- **Single & Multi Selection Modes**
- **Object and String Array Support**
- **Custom Field Mapping** for complex objects

#### User Interface
- **Search & Filter** functionality with customizable search behavior
- **Keyboard Navigation** - Full keyboard accessibility
  - Arrow Up/Down for navigation
  - Enter/Space for selection
  - Escape to close dropdown
  - Home/End for first/last item
  - Tab for focus management
- **Responsive Design** - Mobile-friendly and touch-optimized
- **Customizable Appearance** - CSS custom properties for theming
- **Loading State** support
- **Empty State** handling
- **Badge/Chip Display** for selected items

#### Accessibility (WCAG 2.1 Compliant)
- Full ARIA attribute support
- Screen reader friendly
- Keyboard-only navigation
- Focus management
- High contrast mode support
- Semantic HTML structure

#### Configuration Options
- Select all / Unselect all functionality
- Selection limit enforcement
- Display limit for selected items
- Close on select behavior
- Show selected items at top
- Custom placeholder text
- Custom "no data" messages
- Custom search placeholder
- Clear search on close option
- Maximum height configuration

#### Developer Experience
- **TypeScript First** - 100% TypeScript with strict mode
- **Type-Safe API** - Generic types for data and selection
- **Comprehensive Documentation**
- **Code Examples** for common use cases
- **Unit Tests** with Vitest
- **Performance Optimized** - OnPush change detection
- **Tree-Shakable** - Standalone component architecture

### 🎨 Theming

CSS custom properties for easy customization:
- Colors (background, border, text, hover, selected, focus)
- Spacing (padding, margins, gaps)
- Borders (radius, width)
- Shadows
- Transitions
- Z-index layers

### ⚡ Performance

- OnPush change detection strategy
- Efficient Signals-based state management
- Minimal re-renders
- Optimized search algorithm
- Memory-efficient implementation
- Fast initial load time

### 🔄 Events

- `selectionChange` - Emitted when selection changes
- `dropdownOpen` - Emitted when dropdown opens
- `dropdownClose` - Emitted when dropdown closes
- `searchChange` - Emitted when search term changes
- `selectAll` - Emitted when select all is triggered
- `unselectAll` - Emitted when unselect all is triggered

### 📦 Bundle Size

- Component: ~5KB (gzipped)
- Zero external dependencies
- Tree-shakable exports

### 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

### 📖 Documentation

- Comprehensive README with examples
- API reference documentation
- Contributing guidelines
- Security policy
- Code of Conduct
- TypeScript type definitions
- JSDoc comments for all public APIs

## [0.1.0] - Development Phase

### Added
- Initial project setup
- Basic multiselect functionality
- Standalone component architecture
- Angular Signals integration
- Forms integration (ControlValueAccessor)
- Keyboard navigation
- Search functionality
- Basic styling and theming
- TypeScript strict mode configuration
- Testing setup with Vitest

## Version History (Planned)

### [1.1.0] - Q2 2026 (Planned)
- Virtual scrolling for large datasets
- Custom item templates
- Group selection
- Performance improvements
- Enhanced documentation

### [1.2.0] - Q3 2026 (Planned)
- Multi-level dropdown support
- Drag and drop reordering
- Advanced filtering
- Export functionality
- Additional themes

### [2.0.0] - Q4 2026 (Planned)
- Breaking changes (if needed for Angular updates)
- Major feature additions
- API improvements
- Performance overhaul

## Migration Guides

### Migrating from ng-multiselect-dropdown

If you're migrating from the legacy `ng-multiselect-dropdown` library:

#### Breaking Changes
- Component selector changed from `ng-multiselect-dropdown` to `ngx-multiselect-dropdown`
- Standalone component (no NgModule required)
- Configuration object structure changes
- Event names standardized
- Signals-based API

#### Migration Steps
1. Update imports to standalone component
2. Update component selector in templates
3. Adjust configuration object to new format
4. Update event handlers to new event names
5. Test thoroughly with your data

See [Migration Guide](docs/MIGRATION.md) for detailed instructions.

## Support

- **GitHub Issues**: [Report bugs](https://github.com/noble-wave/ngx-multiselect-dropdown/issues)
- **Discussions**: [Ask questions](https://github.com/noble-wave/ngx-multiselect-dropdown/discussions)
- **Stack Overflow**: Tag with `ngx-multiselect-dropdown` and `angular`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development and contribution guidelines.

## License

[MIT License](LICENSE) - Copyright (c) 2026 Noble Wave

---

## Legend

- 🎉 **Major Release**
- ✨ **Features** - New functionality
- 🐛 **Bug Fixes** - Bug fixes and patches
- ⚡ **Performance** - Performance improvements
- 🔒 **Security** - Security enhancements
- 📖 **Documentation** - Documentation updates
- 🔧 **Maintenance** - Maintenance and chores
- 💥 **Breaking Changes** - Breaking changes requiring migration
- 🎨 **Styling** - UI/UX improvements
- ♿ **Accessibility** - Accessibility improvements
- 🧪 **Tests** - Test additions or improvements
- 🌍 **Internationalization** - i18n and localization

---

**For the latest updates, visit the [GitHub repository](https://github.com/noble-wave/ngx-multiselect-dropdown)**

**Star ⭐ the project on GitHub if you find it useful!**
