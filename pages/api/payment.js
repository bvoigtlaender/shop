import createMollieClient from "@mollie/api-client";

const mollie = createMollieClient({ apiKey: process.env.MOLLIE_KEY })

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const body = JSON.parse(req.body);
      const { amount, description } = body;
      console.log(body.amount)
      const payment = await mollie.payments.create({
        amount: {
          value: amount.toString(),
          currency: 'EUR'
        },
        description: description,
        method: ['sofort'],
        redirectUrl: 'http://localhost:3000',
      });
      console.log({
        amount: {
          value: req.body.amount,
          currency: 'EUR'
        },
        description: req.body.description,
        redirectUrl: 'https://locahost:3000/order/123456',
        webhookUrl: 'https://localhost:3000/webhook'
      });
      console.log(payment)
      return res.status(200).json({ payment, checkoutUrl: payment.getCheckoutUrl() });
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} not allowed`);
  }
}