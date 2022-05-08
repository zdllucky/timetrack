# Timetrack &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/) 

Self-hosted open source solution for tracking and managing employee attendance, budgets, papers and more.

* **Reason:** I came out with this project, having "pain" managing human resources in companies I worked for. By that time I already built concept solution which worked great, so I came out with a decision to deliver it to masses.
* **Benefits:**: Unlike any other paid solutions Timetrack provides you totally free self-hosted platform with **full control** on privacy and configuration.
* **Module architecture:** The idea behind Timetrack is to provide minimal working solution which could be easily extended with custom modules. No need for digging core source code.
* **Free forever:** Most solutions I used were about non-convenient pricing politics and poor customization due to cloud infrastructure and private codebase. To deal with it, I decided to go opensource.

## Current status

The project is at the development stage right now. Star / watch to subscribe for updates.

## Expected features

- One line command installation
- Time tracking, including checkin and recurrent validation
- Flexible organization structuring
- Timetables, reports, documents generation
- Platform extension via custom modules at runtime
- Public APIs for quick integration with 3rd party software
- Simple and powerful administration interface
- iOS and Android apps available from stores directly
- Customization including logo theming and other
- Localization

## Project architecture

* [Core](https://github.com/zdllucky/timetrack/tree/main/core) backend monolith.
* [Web client](https://github.com/zdllucky/timetrack/tree/main/web-client) for Timetrack. Is served via monolith. Note that this client is used both for delivering app content and administration interfaces.
* [Application wrapper](https://github.com/zdllucky/timetrack/tree/main/wrapper_app) distributes iOS & Android apps to stores.
* [Deploy](https://github.com/zdllucky/timetrack/tree/main/deploy) folder contains distribution runnable, scripts and configs.


## Guides, documentation and examples

Will be provided on first release

## Contributing

This project is now developed at spare time. I will be glad to anyone who would like to contribute to the project. Currently, project strongly requires:

- **JS/TS developers** (see [core](https://github.com/zdllucky/timetrack/tree/main/core/package.json) and [web client](https://github.com/zdllucky/timetrack/tree/main/web-client/package.json) stacks) - core API and frontend delivery;
- **Flutter developers** - iOS & Android wrapper applications delivery;
- CI/CD enthusiasts - provide easy and stable software delivery;
- Documentation archivists - support community.
