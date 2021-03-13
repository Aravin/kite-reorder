import { appConfig } from './config';

var KiteConnect = require("kiteconnect").KiteConnect;

var kc = new KiteConnect({
	api_key: "uy1ht2p563trjd9m"
});

kc

kc.generateSession("lgXeEY1QutiIJic1naH8J7PcCVijSCIC", "uugz2ttio5gjvpmnk9mygco1fydcj0ew")
	.then((response: any) => {
		init();
	})
	.catch((err: any) => {
		console.log(err);
	});

function init() {
	// Fetch equity margins.
	// You can have other api calls here.
	kc.getMargins()
		.then((response: any) => {
            console.log(response);
			// You got user's margin details.
		}).catch((err: any) => {
			// Something went wrong.
            console.log(err);
		});


        kc.getOrders()
		.then((response: any) => {
            console.log(response);
			// You got user's margin details.
		}).catch((err: any) => {
			// Something went wrong.
            console.log(err);
		});
}