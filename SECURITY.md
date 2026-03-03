# Security Policy

## 🔒 Reporting Security Vulnerabilities

The **ngx-multiselect-dropdown** team takes security issues seriously. We appreciate your efforts to responsibly disclose your findings and will make every effort to acknowledge your contributions.

### How to Report a Security Vulnerability

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

**📧 [your.email@example.com](mailto:your.email@example.com)**

Include the following information in your report:

- **Type of vulnerability** (e.g., XSS, injection, authentication bypass)
- **Full paths** of source file(s) related to the vulnerability
- **Location** of the affected source code (tag/branch/commit or direct URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact** of the vulnerability, including how an attacker might exploit it

You should receive a response within **48 hours**. If for some reason you do not, please follow up via email to ensure we received your original message.

## 🛡️ Security Update Process

1. **Report received** - We'll acknowledge receipt of your vulnerability report
2. **Assessment** - We'll confirm the vulnerability and determine its severity
3. **Fix development** - We'll develop a fix for the vulnerability
4. **Testing** - The fix will be thoroughly tested
5. **Release** - A security patch will be released
6. **Disclosure** - After the patch is available, we'll publicly disclose the vulnerability

## 📋 Supported Versions

We provide security updates for the following versions:

| Version | Supported          | Angular Version |
| ------- | ------------------ | --------------- |
| 1.x.x   | ✅ Yes            | 17, 18, 19, 20, 21+ |
| 0.x.x   | ⚠️ Beta           | 17+             |

## 🔐 Security Best Practices

When using **ngx-multiselect-dropdown** in your Angular applications:

### 1. **Content Security Policy (CSP)**
Ensure your application has a proper Content Security Policy configured:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'">
```

### 2. **Sanitize User Input**
Always sanitize user-provided data before displaying it:

```typescript
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

getSanitizedValue(value: string) {
  return this.sanitizer.sanitize(SecurityContext.HTML, value);
}
```

### 3. **XSS Prevention**
The component automatically handles HTML escaping for text content. However, if you use custom templates, ensure proper escaping:

```html
<!-- Safe: Text binding (automatically escaped) -->
<div>{{ itemText }}</div>

<!-- Unsafe: HTML binding (use with caution) -->
<div [innerHTML]="itemHtml"></div>
```

### 4. **Input Validation**
Validate all data passed to the component:

```typescript
const sanitizedItems = items.filter(item => {
  return typeof item === 'object' && 
         item.id !== undefined && 
         typeof item.text === 'string';
});
```

### 5. **Dependency Management**
Keep your dependencies up to date:

```bash
npm audit
npm update ngx-multiselect-dropdown
```

### 6. **TypeScript Strict Mode**
Use TypeScript strict mode for better type safety:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true
  }
}
```

## 🚨 Known Security Considerations

### DOM XSS Protection
The component uses Angular's built-in sanitization for:
- Item text display
- Search input
- Placeholder text
- Custom labels

### Click-Outside Directive
The click-outside directive uses document event listeners. This is a standard pattern and does not introduce security vulnerabilities when used as intended.

### Accessibility Features
ARIA attributes are dynamically generated and properly escaped to prevent attribute injection attacks.

## 📊 Security Audit History

| Date | Version | Findings | Status |
|------|---------|----------|--------|
| TBD  | 1.0.0   | Initial security audit | Planned |

## 🔍 Third-Party Security

This library has **zero external dependencies** beyond Angular core, which significantly reduces the attack surface compared to libraries with many dependencies.

### Angular Framework Security

This component follows [Angular Security Best Practices](https://angular.io/guide/security):

- ✅ Uses Angular's built-in XSS protection
- ✅ Leverages Angular's DOM sanitization
- ✅ Follows Angular's template syntax
- ✅ Uses Angular's change detection
- ✅ Implements proper event handling

## 🏆 Security Recognition

We appreciate security researchers who responsibly disclose vulnerabilities. With your permission, we'll acknowledge your contribution in:

- Security advisories
- Release notes
- Project README

You can choose to be:
- **Publicly credited** with your name/handle
- **Anonymously acknowledged**
- **Not mentioned** (if you prefer)

## 📜 Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find similar problems
3. Prepare fixes for all supported versions
4. Release new security patch versions as soon as possible

We aim to disclose vulnerabilities within **90 days** of the initial report, or sooner if a fix is available.

## 🌐 Additional Resources

- [Angular Security Guide](https://angular.io/guide/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Common Weakness Enumeration](https://cwe.mitre.org/)
- [CVE Database](https://cve.mitre.org/)

## 📞 Contact

For security inquiries: **[your.email@example.com](mailto:your.email@example.com)**

For general support: [GitHub Issues](https://github.com/yourusername/ngx-multiselect-dropdown/issues)

---

**Thank you for helping keep ngx-multiselect-dropdown and the Angular community safe!** 🛡️
