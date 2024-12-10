import { pool } from "../config.js";
import { sendMail } from "../utils/sendMail.js";

const reserve = async (req, res) => {
  const {
    userId,
    roomId,
    plannedArrivalDate,
    plannedDepartureDate,
    recipient,
    address,
    number,
    floor,
    price,
    // actualArrivalDate,
    // actualDepartureDate,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO reservation (user_id, room_id, planned_arrival_date, planned_departure_date)
          VALUES ($1, $2, $3, $4)`,
      [
        userId,
        roomId,
        plannedArrivalDate.slice(0, 10),
        plannedDepartureDate.slice(0, 10),
      ]
    );

    const mailOptions = {
      from: {
        name: "BAVIS",
        address: process.env.GMAIL_ADDRESS,
      },
      to: [`${recipient}`],
      subject: `🏢 Bendrabučio rezervavimas 🏢`,
      text: ``,
      html: `
            <html>
                <body>
                    <h1>Bendrabučio rezervavimo užklausa</h1>
                    <p>Dėkojame už jūsų rezervaciją, mes ją gavome. Mūsų administracija patikrins iki 3 darbo dienų.</p>
                    <h2>Rezervacijos informacija</h2>
                    <p>Adresas: ${address}</p>
                    <p>Kambario nr.: ${number}</p>
                    <p>Aukštas: ${floor}</p>
                    <p>Kaina: ${price} €/mėn</p>
                    </body>
            </html>
            `,
    };

    const systemMailOptions = {
      from: {
        name: "BAVIS",
        address: process.env.GMAIL_ADDRESS,
      },
      to: [`${process.env.GMAIL_ADDRESS}`],
      subject: `🏢 Bendrabučio rezervavimas 🏢`,
      text: ``,
      html: `
              <html>
                  <body>
                      <h1>Bendrabučio rezervavimo užklausa</h1>
                      <p>Pateikta nauja bendrabučio rezervacijos paraiška. Ją galite patikrinti: <a href="http://localhost:5173/notifications">ČIA</a></p>
                      </body>
              </html>
              `,
    };

    sendMail(mailOptions);
    sendMail(systemMailOptions);
    res.status(200).json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const stay = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
      payment_history.id,
      contact.first_name, 
      contact.last_name, 
      dormitory.address,
      room.number, 
      TO_CHAR(stay.actual_arrival_date, 'YYYY-MM-DD') AS actual_arrival_date,
      TO_CHAR(stay.actual_departure_date, 'YYYY-MM-DD') AS actual_departure_date,
      payment_history.paid,
      payment_history.amount, 
      TO_CHAR(payment_history.payment_date, 'YYYY-MM-DD') AS payment_date
      FROM stay
      INNER JOIN contact ON stay.user_id = contact.id
      INNER JOIN room ON stay.room_id = room.id
      INNER JOIN dormitory ON room.dormitory_id = dormitory.id
      LEFT JOIN payment_history ON stay.id = payment_history.stay_id
      WHERE stay.user_id = $1`,
      [id]
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
  }
};

export { reserve, stay };
