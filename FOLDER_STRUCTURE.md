# ngx-multiselect-dropdown - Folder Structure

```
ngx-multiselect-dropdown/
├── .angular/                              # Angular build cache (generated)
│   └── cache/
│       └── 21.1.1/
│           └── ngx-multiselect-dropdown/
│               └── vite/                  # Vite dev server cache
│
├── .vscode/                               # VS Code workspace settings
│   ├── extensions.json                    # Recommended extensions
│   ├── launch.json                        # Debug configurations
│   ├── mcp.json                          # Model Context Protocol config
│   └── tasks.json                        # Task runner configurations
│
├── node_modules/                          # npm dependencies (excluded from git)
│
├── dist/                                  # Build output (generated)
│
├── public/                                # Static assets
│   └── favicon.ico                       # Site favicon
│
├── src/                                   # Source code
│   │
│   ├── app/                              # Demo application
│   │   ├── app.config.ts                 # Application configuration
│   │   ├── app.routes.ts                 # Route definitions
│   │   ├── app.ts                        # Root component (TypeScript)
│   │   ├── app.html                      # Root component template
│   │   ├── app.scss                      # Root component styles
│   │   └── app.spec.ts                   # Root component tests (TODO)
│   │
│   ├── lib/                              # Library source code
│   │   │
│   │   ├── components/                   # UI Components
│   │   │   ├── multiselect-dropdown/
│   │   │   │   ├── multiselect-dropdown.component.ts      # Main component logic
│   │   │   │   ├── multiselect-dropdown.component.html    # Component template
│   │   │   │   └── multiselect-dropdown.component.scss    # Component styles
│   │   │   └── index.ts                  # Component exports
│   │   │
│   │   ├── directives/                   # Angular Directives
│   │   │   ├── click-outside.directive.ts  # Click outside detector
│   │   │   └── index.ts                    # Directive exports
│   │   │
│   │   ├── models/                       # TypeScript interfaces and types
│   │   │   ├── dropdown-item.interface.ts     # DropdownItem & FieldMapping
│   │   │   ├── dropdown-config.interface.ts   # Configuration options
│   │   │   └── index.ts                       # Model exports
│   │   │
│   │   ├── pipes/                        # Angular Pipes
│   │   │   └── (empty - reserved for future)
│   │   │
│   │   ├── services/                     # Business logic services
│   │   │   ├── dropdown-state.service.ts # Signal-based state management
│   │   │   └── index.ts                  # Service exports
│   │   │
│   │   └── index.ts                      # Library barrel export
│   │
│   ├── index.html                        # Main HTML file
│   ├── main.ts                           # Application bootstrap
│   ├── public-api.ts                     # Library public API surface
│   └── styles.scss                       # Global styles
│
├── .editorconfig                         # Editor configuration
├── .gitignore                            # Git ignore rules
├── angular.json                          # Angular workspace configuration
├── package.json                          # npm package configuration
├── package-lock.json                     # npm dependency lock file
├── README.md                             # Library documentation
├── tsconfig.json                         # TypeScript base configuration
├── tsconfig.app.json                     # TypeScript config for app
└── tsconfig.spec.json                    # TypeScript config for tests
```

## 📂 Directory Purpose

### `/src/lib/` - Library Code (Production)
This is the **core library** that will be published to npm. All production code lives here.

- **`components/`** - Reusable UI components
  - Each component in its own folder with `.ts`, `.html`, `.scss`
  - Standalone component architecture (no NgModules)

- **`directives/`** - Reusable Angular directives
  - Click-outside detection
  - Future: keyboard shortcuts, focus management, etc.

- **`models/`** - TypeScript interfaces and type definitions
  - Clean, strictly-typed interfaces
  - No classes or logic - pure type definitions
  - Includes default configurations

- **`services/`** - Business logic and state management
  - Signal-based reactive state
  - Pure functions and utilities
  - No direct DOM manipulation

- **`pipes/`** - Angular transformation pipes
  - Reserved for future use (filtering, formatting, etc.)

### `/src/app/` - Demo Application
This is the **demo app** that showcases the library. Not published to npm.

- Demonstrates all library features
- Serves as living documentation
- Used for local development and testing

### Root Configuration Files

| File | Purpose |
|------|---------|
| `angular.json` | Angular CLI workspace configuration |
| `package.json` | npm dependencies and scripts |
| `tsconfig.json` | TypeScript compiler base config |
| `tsconfig.app.json` | TypeScript config for application |
| `tsconfig.spec.json` | TypeScript config for tests |
| `.editorconfig` | Code style consistency across editors |
| `README.md` | Library documentation and usage guide |

## 🎯 Key Design Decisions

### 1. **Library-First Structure**
- Core library in `/src/lib/`
- Demo app in `/src/app/`
- Clear separation of concerns

### 2. **Standalone Components**
- No `NgModule` files
- Each component is self-contained
- Modern Angular 17+ architecture

### 3. **Signal-Based State**
- All state management uses Angular Signals
- Computed values via `computed()`
- Side effects via `effect()` in injection contexts

### 4. **Clean Exports**
- `src/public-api.ts` - Public API surface
- Barrel exports (`index.ts`) in each folder
- Consumers import from root: `import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown'`

### 5. **TypeScript Strict Mode**
- Full type safety
- No `any` types in public APIs
- Generic types for flexibility

## 📦 Future Expansion

Ready for these additions without restructuring:

```
src/lib/
├── pipes/
│   ├── highlight.pipe.ts          # Highlight search terms
│   └── item-filter.pipe.ts        # Advanced filtering
│
├── components/
│   ├── dropdown-item/              # Custom item renderer
│   ├── dropdown-header/            # Custom header
│   └── dropdown-footer/            # Custom footer
│
├── directives/
│   ├── virtual-scroll.directive.ts # For large lists
│   └── drag-drop.directive.ts      # Reorder items
│
└── utils/
    ├── validators.ts               # Form validators
    └── helpers.ts                  # Utility functions
```

## 🚀 Build Output Structure

When built for production (`npm run build`):

```
dist/ngx-multiselect-dropdown/
├── index.d.ts                      # TypeScript declarations
├── esm2022/                        # ES2022 modules
├── fesm2022/                       # Flat ES2022 modules
└── package.json                    # Package metadata
```

---

**Last Updated:** January 28, 2026  
**Angular Version:** 21.1.0  
**Architecture:** Standalone Components + Signals
