import PDFDocument from "pdfkit";
import Invoice from "../models/invoice.model.js";
import Order from "../models/order.model.js";

export const generateInvoicePDF = async (invoiceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const invoice = await Invoice.findById(invoiceId);
      if (!invoice) throw new Error("Invoice not found");

      const order = await Order.findById(invoice.orderId).populate("user");
      if (!order) throw new Error("Order not found");

      const doc = new PDFDocument({ margin: 40 });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      /* ========= HEADER ========= */

      doc.fontSize(22).text("GRAPHURA INVOICE", { align: "center" });
      doc.moveDown();

      doc.fontSize(11);
      doc.text(`Invoice ID: ${invoice._id}`);
      doc.text(`Order ID: ${order._id}`);
      doc.text(`Customer: ${order.user.name}`);
      doc.text(`Email: ${order.user.email}`);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);

      doc.moveDown(1.5);

      /* ========= TABLE HEADER ========= */

      const tableTop = doc.y;

      doc.fontSize(12).text("Product", 40, tableTop);
      doc.text("Qty", 260, tableTop);
      doc.text("Price", 320, tableTop);
      doc.text("Total", 420, tableTop);

      doc.moveDown();
      doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke();

      /* ========= TABLE ROWS ========= */

      let position = doc.y + 8;

      order.items.forEach((item) => {
        doc.fontSize(11)
          .text(item.name, 40, position)
          .text(item.quantity, 260, position)
          .text(`₹${item.price}`, 320, position)
          .text(`₹${item.price * item.quantity}`, 420, position);

        position += 25;
      });

      doc.moveDown(2);

      /* ========= TOTALS ========= */

      doc.fontSize(11);
      doc.text(`Subtotal: ₹${order.subtotal}`, 350);
      doc.text(`GST: ₹${order.gst}`, 350);
      doc.text(`Shipping: ₹${order.shippingCost}`, 350);
      doc.text(`Discount: ₹${order.discount}`, 350);

      doc.moveDown(0.5);
      doc.fontSize(13).text(`Grand Total: ₹${order.total}`, 350);

      doc.moveDown(2);

      doc.fontSize(10).text("Thank you for shopping with Graphura!", {
        align: "center",
      });

      doc.end();

    } catch (err) {
      reject(err);
    }
  });
};
