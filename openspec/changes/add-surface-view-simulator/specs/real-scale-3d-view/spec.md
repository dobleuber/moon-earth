## ADDED Requirements

### Requirement: Single active 3D surface panel
The system SHALL render one active 3D surface-view panel at a time.

#### Scenario: Earth observer view is active
- **WHEN** Earth observer mode is active
- **THEN** the 3D panel renders a surface-based Earth observer environment and targets the Moon as the observed body

#### Scenario: Moon observer view is active
- **WHEN** Moon observer mode is active
- **THEN** the 3D panel renders a surface-based Moon observer environment and targets Earth as the observed body

### Requirement: Fixed-position rotatable camera
The system SHALL allow the user to rotate the camera to look around from the selected surface location without changing the observer position.

#### Scenario: User looks around
- **WHEN** the user drags, swipes, or otherwise uses camera-look controls
- **THEN** the camera orientation changes while the observer position remains fixed

#### Scenario: User cannot walk
- **WHEN** the user interacts with the 3D view
- **THEN** the system does not translate the observer position across the surface

### Requirement: Real apparent angular scale
The system SHALL render the Moon and Earth using their calculated real apparent angular diameter from the observer's perspective.

#### Scenario: Render Moon from Earth at real angular scale
- **WHEN** Earth observer mode is active and the Moon is visible
- **THEN** the rendered Moon subtends the calculated lunar angular diameter in the view

#### Scenario: Render Earth from Moon at real angular scale
- **WHEN** Moon observer mode is active and Earth is visible
- **THEN** the rendered Earth subtends the calculated terrestrial angular diameter in the view

#### Scenario: No exaggerated scale mode
- **WHEN** the user views either observer mode
- **THEN** the system provides no control or mode that enlarges the Moon or Earth beyond calculated apparent angular scale

### Requirement: Celestial body placement by apparent direction
The system SHALL place the visible celestial body in the 3D sky according to its calculated apparent altitude and azimuth.

#### Scenario: Target is above horizon
- **WHEN** the active target is visible above the horizon
- **THEN** the system renders it at the corresponding sky direction in the 3D view

#### Scenario: Target is not visible
- **WHEN** the active target is marked not visible
- **THEN** the system does not render the target as if it were above the horizon

### Requirement: Generic Earth environment
The system SHALL render a generic Earth surface environment for Earth observer mode.

#### Scenario: Earth environment is displayed
- **WHEN** Earth observer mode is active
- **THEN** the 3D panel includes a generic ground or horizon and an Earth sky appropriate to the selected instant

### Requirement: Generic Moon environment
The system SHALL render a generic Moon surface environment for Moon observer mode.

#### Scenario: Moon environment is displayed
- **WHEN** Moon observer mode is active
- **THEN** the 3D panel includes generic lunar terrain, a lunar horizon, and a black sky

### Requirement: Center target control
The system SHALL provide a way to orient the camera toward the visible target body without moving the observer position.

#### Scenario: Center visible target
- **WHEN** the user activates the center target control and the active target is visible
- **THEN** the system rotates the camera to look toward the target body

#### Scenario: Center unavailable target
- **WHEN** the user activates the center target control and the active target is not visible
- **THEN** the system keeps observer position fixed and communicates that the target is not currently visible
