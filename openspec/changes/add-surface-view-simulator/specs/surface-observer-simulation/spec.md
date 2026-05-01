## ADDED Requirements

### Requirement: Observer mode selection
The system SHALL provide exactly one active observer mode at a time: Earth observer mode or Moon observer mode.

#### Scenario: Switch from Earth to Moon observer
- **WHEN** the user activates the observer toggle while Earth observer mode is active
- **THEN** the system switches the active view to Moon observer mode using the same selected date and time

#### Scenario: Switch from Moon to Earth observer
- **WHEN** the user activates the observer toggle while Moon observer mode is active
- **THEN** the system switches the active view to Earth observer mode using the same selected date and time

### Requirement: Real date and time input
The system SHALL let users select a real calendar date and time for the simulation.

#### Scenario: User changes date or time
- **WHEN** the user changes the selected date or time
- **THEN** the system recalculates the active observer view for the updated instant

#### Scenario: Internal calculation instant
- **WHEN** the system performs astronomy calculations
- **THEN** the system uses a consistent UTC instant derived from the selected date and time

#### Scenario: User changes UTC hour with scrubber
- **WHEN** the user changes the UTC hour scrubber
- **THEN** the system updates the selected time on the same selected date and recalculates the active observer view

#### Scenario: User changes lunar phase with scrubber
- **WHEN** the user changes the lunar phase scrubber
- **THEN** the system updates the selected date/time to a real instant near the current lunar cycle with the requested lunar phase and recalculates the active observer view

### Requirement: Earth observer location selection
The system SHALL let users select an Earth observation location from curated presets with real geographic coordinates.

#### Scenario: User selects an Earth location
- **WHEN** the user selects an Earth location preset
- **THEN** the system uses that location's latitude and longitude for Earth observer calculations

#### Scenario: Earth location is retained across mode switches
- **WHEN** the user switches away from and back to Earth observer mode
- **THEN** the previously selected Earth location remains selected

### Requirement: Moon observer location selection
The system SHALL let users select a Moon observation location from curated presets with lunar coordinates.

#### Scenario: User selects a Moon location
- **WHEN** the user selects a Moon location preset
- **THEN** the system uses that location's lunar latitude and longitude for Moon observer calculations

#### Scenario: Moon location is retained across mode switches
- **WHEN** the user switches away from and back to Moon observer mode
- **THEN** the previously selected Moon location remains selected

### Requirement: Earth observer target calculation
The system SHALL calculate the Moon's apparent direction, phase, visibility, and angular diameter for the selected Earth location and instant.

#### Scenario: Moon is above the Earth observer horizon
- **WHEN** the calculated Moon altitude is greater than the local horizon threshold
- **THEN** the system marks the Moon as visible and provides its apparent altitude, azimuth, phase, and angular diameter

#### Scenario: Moon is below the Earth observer horizon
- **WHEN** the calculated Moon altitude is at or below the local horizon threshold
- **THEN** the system marks the Moon as not visible and does not require the 3D view to display it

### Requirement: Moon observer target calculation
The system SHALL calculate the Earth's apparent direction, phase, visibility, and angular diameter for the selected Moon location and instant using an educational-realistic model.

#### Scenario: Earth is visible from selected lunar location
- **WHEN** the selected lunar location has line of sight to Earth in the educational-realistic model
- **THEN** the system marks Earth as visible and provides its apparent altitude, azimuth, phase, and angular diameter

#### Scenario: Earth is not visible from selected lunar location
- **WHEN** the selected lunar location does not have line of sight to Earth in the educational-realistic model
- **THEN** the system marks Earth as not visible and does not require the 3D view to display it

### Requirement: Shared simulation state
The system SHALL keep observer mode, selected date/time, Earth location, and Moon location as shared simulation state.

#### Scenario: State drives active view
- **WHEN** any simulation state value changes
- **THEN** the system updates the active observer calculation and the displayed view from that state
