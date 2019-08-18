# Hubstaff for VSCode
<a href="https://marketplace.visualstudio.com/items?itemName=mehrad.hubstaff" title="Hubstaff">
    <img src="https://raw.githubusercontent.com/mehrad77/hubstaff-vscode/master/logo.png" alt="Hubstaff for VSCode">
</a>

<center>
    
[![Latest Release](https://vsmarketplacebadge.apphb.com/version-short/mehrad.hubstaff.svg)](https://marketplace.visualstudio.com/items?itemName=mehrad.hubstaff)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/mehrad.hubstaff.svg)](https://marketplace.visualstudio.com/items?itemName=mehrad.hubstaff)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-short/mehrad.hubstaff.svg)](https://marketplace.visualstudio.com/items?itemName=mehrad.hubstaff#review-details)


See your worked hours in VSCode status bar. Powerd by **[Hubstaff API](https://app.hubstaff.com/developer/docs/api/v1)**.

*Contributions and bug reports are welcome.*

</center>

## Installing

Launch VS Code Quick Open (`Ctrl + P`), paste the following command, and press enter:

```bash
ext install hubstaff
```

Or search for [`Hubstaff`](https://marketplace.visualstudio.com/items?itemName=mehrad.hubstaff) in your editor.

## How to use?

 1. Create an [app on your Hubstaff account](https://app.hubstaff.com/developer/my_apps).
 ![](guid1.png)
 1. Copy your `App token`.
 1. Return to VSCode and press `Ctrl + Shift + P`, then type `hubstaff` and chose `Set Hubstaff App token`.
 1. paste your `App token`.
 1. Done! now you got your time for today in Status Bar,

## Extension Settings

// TODO

## Release Notes

## [Unreleased]

## 0.0.2

- Initial release.
It would store your `APP_TOKEN` and `EMAIL` and `PASSWORD` to genrate `AUTH_TOKEN`. then it would use `API.custom.by_date.my` to get hours worked today.

## 0.0.1

- Clone project using `yo code` tool.


## Contributors <3
If you can make a contribution to this project, **that's one small step for you but one giant leap for mankind.**

The API Specs can be found [here](https://app.hubstaff.com/developer/docs/api/v1). we're using version 1.

## Disclimer
This extention is free and open sourse and has no realtion to Netsoft Holdings, LLC (Hubstaff company).
