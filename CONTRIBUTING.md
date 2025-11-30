# Contributing to ESA-MU Examination Bank System

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Report issues professionally

## How to Contribute

### 1. Report Issues

Found a bug or have a feature request?

1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, etc.)

### 2. Submit Code Changes

#### Fork and Clone
\`\`\`bash
git clone https://github.com/your-username/exam-bank-system.git
cd exam-bank-system
git checkout -b feature/your-feature-name
\`\`\`

#### Make Changes
- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Keep commits focused and atomic

#### Test Your Changes
\`\`\`bash
npm run dev
# Test the application manually
\`\`\`

#### Submit a Pull Request
1. Push your branch to your fork
2. Create a pull request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - List of changes made

### 3. Code Style Guidelines

#### TypeScript
- Use explicit types
- Avoid `any` type
- Use interfaces for object shapes

\`\`\`typescript
// Good
interface Exam {
  id: string
  course_name: string
  file_url: string
}

// Avoid
const exam: any = { ... }
\`\`\`

#### React Components
- Use functional components
- Use hooks for state management
- Keep components focused and reusable
- Add prop types/interfaces

\`\`\`typescript
// Good
interface ExamCardProps {
  exam: Exam
  onDownload: (id: string) => void
}

export function ExamCard({ exam, onDownload }: ExamCardProps) {
  return (...)
}
\`\`\`

#### Styling
- Use Tailwind CSS classes
- Follow the design system
- Use semantic color tokens
- Keep styles in component files

\`\`\`tsx
// Good
<div className="flex items-center gap-4 p-4 bg-background rounded-lg">
  ...
</div>

// Avoid
<div style={{ display: 'flex', padding: '16px' }}>
  ...
</div>
\`\`\`

### 4. Commit Message Guidelines

Write clear, descriptive commit messages:

\`\`\`
feat: add exam search functionality
fix: correct department name display
docs: update setup instructions
style: format code with prettier
refactor: simplify exam filtering logic
test: add tests for upload validation
\`\`\`

Format: `type: description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Build, dependencies, etc.

### 5. Testing

Before submitting a PR:

1. Test locally: `npm run dev`
2. Test all affected features
3. Check for console errors
4. Test on different screen sizes
5. Verify database operations work

### 6. Documentation

Update documentation for:
- New features
- API changes
- Configuration changes
- Setup changes

## Development Workflow

### Project Structure
\`\`\`
app/              - Next.js pages and API routes
components/       - React components
lib/              - Utilities and helpers
scripts/          - Database migrations
public/           - Static assets
\`\`\`

### Adding a New Feature

1. Create a new branch: `git checkout -b feature/feature-name`
2. Create necessary files in appropriate directories
3. Update types in `lib/types.ts` if needed
4. Add API routes in `app/api/` if needed
5. Create components in `components/`
6. Update documentation
7. Test thoroughly
8. Submit PR

### Database Changes

1. Create a new migration script in `scripts/`
2. Name it with a version number: `005_your_change.sql`
3. Test the migration locally
4. Document the changes
5. Include migration instructions in PR

### API Changes

1. Update the API route in `app/api/`
2. Update types in `lib/types.ts`
3. Update `API.md` documentation
4. Test with curl or Postman
5. Include examples in PR

## Review Process

1. Maintainers will review your PR
2. Provide feedback or request changes
3. Address feedback and update PR
4. Once approved, PR will be merged
5. Your contribution will be acknowledged

## Questions?

- Open an issue for questions
- Check existing documentation
- Ask in discussions section
- Contact maintainers

Thank you for contributing! 🎉
