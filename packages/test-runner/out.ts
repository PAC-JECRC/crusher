(async function() {
    class GlobalManagerPolyfill {
        map;
        constructor() {
            this.map = new Map();
        }
        has(key) {
            return this.map.has(key);
        }
        get(key) {
            return this.map.get(key);
        }
        set(key, value) {
            this.map.set(key, value);
        }
    }
    class LogManagerPolyfill {
        logStep(...args) {
            console.log(args[2]);
        }
    }
    class StorageManagerPolyfill {
        uploadBuffer(buffer, destionation) {
            return "uploadBuffer.jpg";
        }
        upload(filePath, destination) {
            return "upload.jpg";
        }
        remove(filePath) {
            return "remove.jpg";
        }
    }
    const logManager = new LogManagerPolyfill();
    const storageManager = new StorageManagerPolyfill();
    const globalManager = new GlobalManagerPolyfill();
    const playwright = require("playwright");
    const path = require("path");

    const {
        CrusherRunnerActions,
        handlePopup,
        getBrowserActions,
        getMainActions
    } = require("crusher-runner-utils");

    // @TODO: globalManager, logManager and storageManager are supposed to be injected globally
    const crusherRunnerActionManager = new CrusherRunnerActions(logManager, storageManager, "/tmp/crusher/somedir/", globalManager);

    const browser = await playwright["webkit"].launch({
        "headless": false,
        "args": []
    });
    let capturedVideo, browserContext, page;
    try {
        globalManager.set("browserContextOptions", {
            "defaultNavigationTimeout": 30000,
            "defaultTimeout": 15000
        });

        const actions = [{
            "type": "BROWSER_SET_DEVICE",
            "payload": {
                "meta": {
                    "device": {
                        "id": "GoogleChromeMediumScreen",
                        "name": "Desktop M",
                        "width": 1280,
                        "height": 800,
                        "visible": true,
                        "userAgent": "Google Chrome"
                    }
                }
            },
            "screenshot": null
        }, {
            "type": "PAGE_NAVIGATE_URL",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "body",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "html >> body",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": "html > body",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": "https://www.stage-headout.com/"
                }
            },
            "screenshot": null,
            "url": "https://www.stage-headout.com/"
        }, {
            "type": "PAGE_NAVIGATE_URL",
            "payload": {
                "selectors": [],
                "meta": {
                    "value": "http://hub.headout.com"
                }
            },
            "screenshot": null
        }, {
            "type": "PAGE_WAIT_FOR_NAVIGATION",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "body",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "html >> body",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": "html > body",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": "https://hub.headout.com/"
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/"
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "text=Login",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "a",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[href=\"/app/\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> a",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "a[href=\"/app/\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [href=\"/app/\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".hOiPIA >> a",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".hOiPIA >> [href=\"/app/\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> a[href=\"/app/\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(2) >> a",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "a[href=\"/app/\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".Header__Navigation-ga3160-2 > .TypeSystem__StyledLink-u8borm-12",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".Header__NavigationWrapper-ga3160-7 .TypeSystem__StyledLink-u8borm-12",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".Header__Container-ga3160-1 .TypeSystem__StyledLink-u8borm-12",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/A[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/"
        }, {
            "type": "PAGE_WAIT_FOR_NAVIGATION",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "body",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "html >> body",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": "html > body",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": "https://hub.headout.com/app/"
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/"
        }, {
            "type": "ELEMENT_FOCUS",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your email address\"][type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-15",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".font-light",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".leading-none",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": "div > .css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-koucz6-contentContainer .css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/INPUT[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": true
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/"
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your email address\"][type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-15",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".font-light",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".leading-none",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": "div > .css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-koucz6-contentContainer .css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/INPUT[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/"
        }, {
            "type": "ELEMENT_ADD_INPUT",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your email address\"][type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-15",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".font-light",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".leading-none",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": "div > .css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-koucz6-contentContainer .css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/INPUT[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": "preethi@headout.com"
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/"
        }, {
            "type": "ELEMENT_PRESS",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your email address\"][type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-15",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".font-light",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".leading-none",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[placeholder=\"Enter your email address\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[type=\"email\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": "div > .css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-koucz6-contentContainer .css-9ro8cg-inputBox:nth-child(1) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/INPUT[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": "Tab"
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/"
        }, {
            "type": "ELEMENT_FOCUS",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "[type=\"password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your password\"][type=\"password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [type=\"password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input[type=\"password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [placeholder=\"Enter your password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input[placeholder=\"Enter your password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[type=\"password\"].text-15",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[type=\"password\"].font-light",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[type=\"password\"].leading-none",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[placeholder=\"Enter your password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[type=\"password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".css-9ro8cg-inputBox:nth-child(2) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": "div > .css-9ro8cg-inputBox:nth-child(2) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-koucz6-contentContainer .css-9ro8cg-inputBox:nth-child(2) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[2]/INPUT[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": true
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/"
        }, {
            "type": "ELEMENT_ADD_INPUT",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "[type=\"password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[placeholder=\"Enter your password\"][type=\"password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [type=\"password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input[type=\"password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [placeholder=\"Enter your password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "input[placeholder=\"Enter your password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[type=\"password\"].text-15",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[type=\"password\"].font-light",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[type=\"password\"].leading-none",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[placeholder=\"Enter your password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "attribute",
                    "value": "input[type=\"password\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".css-9ro8cg-inputBox:nth-child(2) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": "div > .css-9ro8cg-inputBox:nth-child(2) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-koucz6-contentContainer .css-9ro8cg-inputBox:nth-child(2) > .leading-none",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[2]/INPUT[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": "headout"
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/"
        }, {
            "type": "ELEMENT_SCREENSHOT",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "text=Login in to HubEmail AddressPasswordLog in",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(2) >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(2) >> :visible",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(2) >> div:visible",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".css-b1kwtm-contentSection > .css-koucz6-contentContainer",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-1jfze34-bodyPage .css-koucz6-contentContainer",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": "div .css-koucz6-contentContainer",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]",
                    "uniquenessScore": 1
                }],
                "meta": null
            },
            "screenshot": null,
            "url": ""
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "text=Log in",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "button",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".undefined",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> button",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> .undefined",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "button.undefined",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "button.text-white",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "button.leading-none",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "button.font-heading",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-white.undefined",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": "div > .bg-purps",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-koucz6-contentContainer .bg-purps",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-b1kwtm-contentSection .bg-purps",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/BUTTON[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/"
            },
            {
                "type": "PAGE_WAIT_FOR_NAVIGATION",
                "payload": {
                    "selectors": [{
                        "type": "playwright",
                        "value": "body",
                        "uniquenessScore": 1
                    }, {
                        "type": "playwright",
                        "value": "html >> body",
                        "uniquenessScore": 1
                    }, {
                        "type": "PnC",
                        "value": "html > body",
                        "uniquenessScore": 1,
                        "meta": {
                            "seedLength": 2,
                            "optimized": 2
                        }
                    }, {
                        "type": "xpath",
                        "value": "BODY",
                        "uniquenessScore": 1
                    }],
                    "meta": {
                        "value": "https://hub.headout.com/app/experiences/"
                    }
                },
                "screenshot": null,
                "url": "https://hub.headout.com/app/experiences/"
            },
            {
            "type": "ELEMENT_HOVER",
            "payload": {
                "selectors": [{
                    "type": "PnC",
                    "value": ".mt-36:nth-child(3) > .grid:nth-child(2) > .relative",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".ml-30 > .mt-36:nth-child(3) > .grid:nth-child(2) > .relative",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/experiences/"
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "text=Manage Inventory & Pricing",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".absolute >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div.absolute >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".absolute.border >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".absolute.rounded >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".absolute >> :visible",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".absolute >> div:visible",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".absolute.border >> :visible",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".absolute.rounded >> :visible",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".absolute > .css-1ugq6px-menuItemCss",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": "div .css-1ugq6px-menuItemCss",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".relative .css-1ugq6px-menuItemCss",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[2]/DIV[3]/DIV[3]/DIV[2]/DIV[2]/DIV[3]/DIV[1]/DIV[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/experiences/"
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "#date >> svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#date >> [fill=\"none\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-12 >> svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".uppercase >> svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div#date >> svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-12 >> [fill=\"none\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".uppercase >> [fill=\"none\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#date >> svg[fill=\"none\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div#date >> [fill=\"none\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".flex.text-12 >> svg",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".font-medium > #date svg",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "attribute",
                    "value": "svg[height=\"16\"]",
                    "uniquenessScore": 0.038461538461538464
                }, {
                    "type": "attribute",
                    "value": "svg[viewBox=\"0 0 16 16\"]",
                    "uniquenessScore": 0.038461538461538464
                }, {
                    "type": "attribute",
                    "value": "svg[xmlns=\"http://www.w3.org/2000/svg\"]",
                    "uniquenessScore": 0.03125
                }, {
                    "type": "attribute",
                    "value": "svg[fill=\"none\"]",
                    "uniquenessScore": 0.029411764705882353
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/svg[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/manage-slots/?option_id=25796&experience_id=13451&start_date=2021-09-22"
        }, {
            "type": "ELEMENT_SCREENSHOT",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "text=22/09/202112:00 PMOpen",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[currentitem=\"false\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[data-for=\"manageSlotsSticky\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [currentitem=\"false\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> [data-for=\"manageSlotsSticky\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[currentitem=\"false\"].flex",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[currentitem=\"false\"].text-12",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> [currentitem=\"false\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[currentitem=\"false\"].uppercase",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".flex-grow >> [currentitem=\"false\"]",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".mt-72 > .flex:nth-child(3)",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".mt-72 > .mt-72 > .flex:nth-child(3)",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".mt-92 .mt-72 > .flex:nth-child(3)",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "dataAttribute",
                    "value": "div[data-tip=\"\"]",
                    "uniquenessScore": 0.05
                }, {
                    "type": "dataAttribute",
                    "value": "div[data-for=\"manageSlotsSticky\"]",
                    "uniquenessScore": 0.05
                }, {
                    "type": "attribute",
                    "value": "div[currentitem=\"false\"]",
                    "uniquenessScore": 0.05
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[1]/DIV[3]",
                    "uniquenessScore": 1
                }],
                "meta": null
            },
            "screenshot": null,
            "url": ""
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": ".flex-start",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div.flex-start",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> .flex",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".flex.flex-start",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> .flex-start",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".flex-grow >> .flex-start",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> div.flex-start",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(5) >> .flex",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(5) >> .flex-start",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(2) >> .flex-start",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".mt-72 > .flex-start",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".mt-72 .flex-start",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".mt-92 .flex-start",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[1]/DIV[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/manage-slots/?option_id=25796&experience_id=13451&start_date=2021-09-22"
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "div:nth-of-type(5).text-15 >> input",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(5).font-light >> input",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(5).justify-center >> input",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".css-wod4nt-inFocusCSS-InputCell > .css-11ulm40-cellContainer-selectedCSS-infinityCSS-InputCell",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".relative .css-11ulm40-cellContainer-selectedCSS-infinityCSS-InputCell",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".border-g7 .css-11ulm40-cellContainer-selectedCSS-infinityCSS-InputCell",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "attribute",
                    "value": "input[disabled=\"\"]",
                    "uniquenessScore": 0.016666666666666666
                }, {
                    "type": "attribute",
                    "value": "input[value=\"∞\"]",
                    "uniquenessScore": 0.016666666666666666
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[1]/DIV[3]/DIV[5]/DIV[1]/DIV[1]/INPUT[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/manage-slots/?option_id=25796&experience_id=13451&start_date=2021-09-22"
        }, {
            "type": "ELEMENT_SCREENSHOT",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "//*[@id='__next']/div[1]/div/section[2]/div[2]/div[5]/div[1]/div[3]/div[5]/div/div",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".relative > .css-wod4nt-inFocusCSS-InputCell",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".border-g7 .css-wod4nt-inFocusCSS-InputCell",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".flex .css-wod4nt-inFocusCSS-InputCell",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "attribute",
                    "value": "div[style=\"outline-style: none; outline-width: 0px;\"]",
                    "uniquenessScore": 0.5
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[1]/DIV[3]/DIV[5]/DIV[1]/DIV[1]",
                    "uniquenessScore": 1
                }],
                "meta": null
            },
            "screenshot": null,
            "url": ""
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": ".font-light >> #svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[tabindex=\"0\"] >> #svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".font-light >> div#svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[tabindex=\"0\"] >> div#svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-15 >> #svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative.font-light >> #svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[tabindex=\"0\"].relative >> #svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[tabindex=\"0\"].font-light >> #svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-15 >> div#svg",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-15.relative >> #svg",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".css-ona62u-toggleButtonPlain-ToggleButtonPlain > #svg",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".flex > .css-ona62u-toggleButtonPlain-ToggleButtonPlain > #svg",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-wod4nt-inFocusCSS-InputCell #svg",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "id",
                    "value": "#svg",
                    "uniquenessScore": 0.047619047619047616
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[1]/DIV[3]/DIV[5]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/manage-slots/?option_id=25796&experience_id=13451&start_date=2021-09-22"
        }, {
            "type": "ELEMENT_SCREENSHOT",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "//*[@id='__next']/div[1]/div/section[2]/div[2]/div[5]/div[1]/div[3]/div[5]/div/div",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".relative > .css-wod4nt-inFocusCSS-InputCell",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".border-g7 .css-wod4nt-inFocusCSS-InputCell",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".flex .css-wod4nt-inFocusCSS-InputCell",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "attribute",
                    "value": "div[style=\"outline-style: none; outline-width: 0px;\"]",
                    "uniquenessScore": 0.5
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[1]/DIV[3]/DIV[5]/DIV[1]/DIV[1]",
                    "uniquenessScore": 1
                }],
                "meta": null
            },
            "screenshot": null,
            "url": ""
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "#button >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#button >> .flex",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-15 >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".leading-none >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-15 >> .flex",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".leading-none >> .flex",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#button >> div.flex",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#button.text-15 >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#button.leading-none >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#button.flex >> .flex",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": "#button > .flex",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".flex > #button > .flex",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-187q484-multipleActionButton #button > .flex",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/manage-slots/?option_id=25796&experience_id=13451&start_date=2021-09-22"
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "text=Close",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-warning-red",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div >> .text-warning-red",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".flex >> .text-warning-red",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> .text-warning-red",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".menu-item.text-warning-red",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".font-light >> .text-warning-red",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".flex-start >> .text-warning-red",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(3).menu-item",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".font-light >> div:nth-of-type(3)",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".px-8 > .text-warning-red",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".flex .text-warning-red",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".css-187q484-multipleActionButton .text-warning-red",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[3]/DIV[3]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/manage-slots/?option_id=25796&experience_id=13451&start_date=2021-09-22"
        }, {
            "type": "ELEMENT_SCREENSHOT",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "#status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".flex >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-12 >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".uppercase >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".items-center >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#status.justify-center",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[currentitem=\"false\"] >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[data-for=\"manageSlotsSticky\"] >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(3)#status",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".flex:nth-child(3) > #status",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".mt-72 > .flex:nth-child(3) > #status",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".mt-72 .flex:nth-child(3) > #status",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "id",
                    "value": "#status",
                    "uniquenessScore": 0.05
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[2]/DIV[3]/DIV[3]",
                    "uniquenessScore": 1
                }],
                "meta": null
            },
            "screenshot": null,
            "url": ""
        }, {
            "type": "ELEMENT_CLICK",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "#status >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".justify-center >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#status.justify-center >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(3)#status >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(3).justify-center >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#status >> :visible",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".justify-center >> :visible",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#status >> div:visible",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#status.justify-center >> :visible",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".justify-center >> div:visible",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".flex:nth-child(3) .css-1r75cml-toggleButton-unSelectedButton-ToggleButton",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".mt-72 > .flex:nth-child(3) .css-1r75cml-toggleButton-unSelectedButton-ToggleButton",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[2]/DIV[3]/DIV[3]/DIV[1]",
                    "uniquenessScore": 1
                }],
                "meta": {
                    "value": ""
                }
            },
            "screenshot": null,
            "url": "https://hub.headout.com/app/manage-slots/?option_id=25796&experience_id=13451&start_date=2021-09-22"
        }, {
            "type": "ELEMENT_SCREENSHOT",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": "#status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".flex >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".text-12 >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".uppercase >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".items-center >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "#status.justify-center",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[currentitem=\"false\"] >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "[data-for=\"manageSlotsSticky\"] >> #status",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(3)#status",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".flex:nth-child(3) > #status",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".mt-72 > .flex:nth-child(3) > #status",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".mt-72 .flex:nth-child(3) > #status",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "attribute",
                    "value": "div[style=\"outline-style: none; outline-width: 0px;\"]",
                    "uniquenessScore": 0.3333333333333333
                }, {
                    "type": "id",
                    "value": "#status",
                    "uniquenessScore": 0.05
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[2]/DIV[3]/DIV[3]",
                    "uniquenessScore": 1
                }],
                "meta": null
            },
            "screenshot": null,
            "url": ""
        }, {
            "type": "ELEMENT_SCREENSHOT",
            "payload": {
                "selectors": [{
                    "type": "playwright",
                    "value": ".relative >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> .flex",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> .items-center",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> .justify-between",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(5) >> div",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(5) >> .flex",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(5) >> .items-center",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": "div:nth-of-type(5) >> .justify-between",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> div.flex",
                    "uniquenessScore": 1
                }, {
                    "type": "playwright",
                    "value": ".relative >> div.items-center",
                    "uniquenessScore": 1
                }, {
                    "type": "PnC",
                    "value": ".pb-100 > .flex",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 2,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".mt-92 > .mt-72 > .flex",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 3,
                        "optimized": 2
                    }
                }, {
                    "type": "PnC",
                    "value": ".flex-grow > .mt-92 > .mt-72 > .flex",
                    "uniquenessScore": 1,
                    "meta": {
                        "seedLength": 4,
                        "optimized": 2
                    }
                }, {
                    "type": "xpath",
                    "value": "BODY/DIV[1]/DIV[1]/DIV[1]/SECTION[2]/DIV[2]/DIV[5]/DIV[1]",
                    "uniquenessScore": 1
                }],
                "meta": null
            },
            "screenshot": null,
            "url": ""
        }]
        await crusherRunnerActionManager.runActions(getBrowserActions(actions), browser);

        let browserContextOptions = globalManager.get("browserContextOptions");

        browserContext = await browser.newContext({
            ...browserContextOptions,
        });

        browserContext.setDefaultNavigationTimeout(browserContextOptions.defaultNavigationTimeout);
        browserContext.setDefaultTimeout(browserContextOptions.defaultTimeout);

        page = await browserContext.newPage({});
        await handlePopup(page, browserContext);

        await page.route('https://rec.smartlook.com/recorder.js', async (route, request) => {
            console.log("Requesting smartlook script, ", request.resourceType());
            await route.abort();
        });
        await crusherRunnerActionManager.runActions(getMainActions(actions), browser, page);
    } catch (ex) {
        console.error(ex);

        // await page.close();
        // await browserContext.close();
        // await browser.close();
        throw ex;
    }


    // await page.close();
    // await browserContext.close();
    // await browser.close();
})()