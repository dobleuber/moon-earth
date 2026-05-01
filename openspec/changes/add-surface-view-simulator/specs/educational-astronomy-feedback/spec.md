## ADDED Requirements

### Requirement: Visibility explanation
The system SHALL explain why the active target is not visible when it is not rendered in the 3D view.

#### Scenario: Moon below Earth horizon
- **WHEN** Earth observer mode is active and the Moon is below the horizon
- **THEN** the system displays an explanation that the Moon is below the horizon for the selected location and time

#### Scenario: Earth invisible from lunar far side
- **WHEN** Moon observer mode is active and the selected lunar location has no line of sight to Earth
- **THEN** the system displays an explanation that Earth is not visible from that lunar location

### Requirement: Observational status summary
The system SHALL show a concise status summary for the active observer view.

#### Scenario: Target is visible
- **WHEN** the active target is visible
- **THEN** the status summary includes the target name, visibility state, phase information, and apparent angular size

#### Scenario: Target is not visible
- **WHEN** the active target is not visible
- **THEN** the status summary includes the target name, non-visible state, and reason for non-visibility

### Requirement: Real scale communication
The system SHALL communicate that celestial bodies are shown at real apparent angular scale.

#### Scenario: User views the simulation
- **WHEN** the 3D surface panel is displayed
- **THEN** the interface indicates that the Moon or Earth is rendered at real apparent scale without enlargement

### Requirement: Educational relationship between phases
The system SHALL provide educational feedback that relates the Moon phase seen from Earth and the Earth phase seen from the Moon.

#### Scenario: Phase information is available
- **WHEN** the system displays phase information for the active target
- **THEN** the system explains the relevant Earth-Moon phase relationship in concise user-facing language

### Requirement: Educational model disclosure
The system SHALL disclose that the astronomy model is educational-realistic rather than ephemeris-grade.

#### Scenario: User accesses model information
- **WHEN** the user views simulation help, about, or methodology information
- **THEN** the system states that calculations are intended for educational realism and are not NASA/JPL ephemeris-grade precision

### Requirement: Location learning cues
The system SHALL use lunar location presets to demonstrate different Earth visibility cases.

#### Scenario: Near-side lunar preset selected
- **WHEN** the user selects a lunar near-side preset
- **THEN** the system can explain that Earth is generally visible from that region of the Moon

#### Scenario: Far-side lunar preset selected
- **WHEN** the user selects a lunar far-side preset
- **THEN** the system can explain that Earth is generally not visible from that region of the Moon

#### Scenario: Limb lunar preset selected
- **WHEN** the user selects a lunar limb preset
- **THEN** the system can explain that Earth may appear near the lunar horizon in the educational-realistic model
