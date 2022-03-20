# Breaking down syntax

- render

* creates a virtual DOM for argument JSX
* Access virtual DOM via _screen_ global
* _screen.getByText()_ find element by display text
* _expect(linkElement).toBeInTheDocument()_ assertion,causes test to succeed or fail

import { render, screen } from '@testing-library/react';
import App from './App';

`test('renders learn react link', () => {render(<App />); const linkElement = screen.getByText(/learn react/i); expect(linkElement).toBeInTheDocument(); });`

# ASSERTIONS

_expect(linkElement).toBeInTheDocument()_

- expect : jest global, starts the assertion
- (linkElement) : expects argument - subject of the assertion
- .toBeInTheDocument : matcher - type of assertion, this matches comes from jest-DOM
- .toBeInTheDocument(): matcher argument - refines matcher

## examples of assertion

- _expect(element.textContent).toBe('Hello')_
- _expect(elementsArray).toHaveLength(7)_

# TDD (Test-Driven Development)

- writing tests before writing code, then you write the code according to "spec" set by tests
- "red-green" testing, means tests fail before code is written

# Types of test

_Unit tests_ : Testings one unit of code in isolation
_Integration test_ : How multiple units work together
_Functional tests_ : Test a particular function (behaviour) of software
_Acceptance/End-to-end(E2E)_ tests- use actual browser and server (Cypress, selenium)

# Functional Testing vs Unit Testing

_Unit Testing_ : Isolated: mock dependencies, test internals

- very easy to pinpoint failures (Good side)
- further from how users interact with the software (Bad side)
- more likely to break with refactoring (Bad side)

_Functional Testing_ : Includes all relevant units, test behaviour

- close to how users interact with the software (Good side)
- Robust tests (means refactoring would still pass)(Good side)
- More difficult to debug failing tests (Bad side)

# TDD vs BDD (Behaviour-Driven-Development)

_BDD_

- Testing Library encourages testing behaviour over implementation

# Accessibilty and Finding Elements

# Unit Testing Functions

- complex logic difficult to test vai functional tests
- Too many edge cases

_When to unit test_

# Screen Query Method

- command

* get: expect element to be in DOM
* query: expect element not to be in DOM
* find : expect elements to apper async

- ALL
  getAll - expects more than one match

#

- test.only to run only one test
- test.skip to run all tests but skip that test
