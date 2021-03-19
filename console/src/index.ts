import fs from 'fs';
import { appConfig } from './config';
import chalk from 'chalk';
import delay from 'delay';
import { Order } from './interface/order';
const KiteConnect = require('kiteconnect').KiteConnect;

const log = console.log;

const kc = new KiteConnect({
	api_key: appConfig.kite.apiKey,
});

export async function startReorder(reqToken: string) {

	log(chalk.black.bgBlue.bold('Reorder Service Started...Waiting for order...'));

	try {

		await kc.generateSession(reqToken, appConfig.kite.secretKey);
		// fs.writeFileSync('request_token.txt', reqToken);
		// fs.writeFileSync('access_token.txt', session.access_token);
		// fs.writeFileSync('public_token.txt', session.public_token);

		for (; ;) {
			let orders: Order[] = await kc.getOrders();
			let filteredOrders = orders.filter((o: Order) => o.exchange === 'NFO'
				// && o.transaction_type === 'BUY'
				&& ['CANCELLED', 'REJECTED', 'CANCELLED AMO'].includes(o.status) === false /* && o.variety === 'regular' */)

			// Repeating order
			if (filteredOrders.length % 2 !== 0) {

				const lastOrder = filteredOrders?.reduce((a: Order, b: Order) => a.order_timestamp > b.order_timestamp ? a : b);

				// place order
				const orderStatus = await kc.placeOrder(lastOrder.variety, {
					exchange: lastOrder.exchange,
					tradingsymbol: lastOrder.tradingsymbol,
					transaction_type: lastOrder.transaction_type,
					quantity: 75,
					product: lastOrder.product,
					order_type: lastOrder.order_type,
					price: lastOrder.price,
				});

				log(chalk.black.bgGreen.bold('Order Placed in Zerodha', orderStatus));

				log(chalk.black.bgGreen.bold(`Repeating Order - ${lastOrder.transaction_type} - ${lastOrder.tradingsymbol} - ${lastOrder.price}`));
			}
			delay(500);
		}
	}
	catch (err) {
		log(chalk.black.bgRed.bold(err.toString()));
	}
}

// startReorder(fs.readFileSync('request_token.txt').toString());
