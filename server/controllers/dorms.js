import pool from "../db/db.js";

// Get all dormitories
const getDorms = async (_, res) => {
  try {
    const dormData = await pool.query(`
      SELECT dormitory.id, dormitory.address, COUNT(room.id) AS room_count
      FROM dormitory
      LEFT JOIN room ON room.dormitory_id = dormitory.id
      GROUP BY dormitory.id
      ORDER BY dormitory.id ASC
    `);
    res.status(200).json(dormData.rows);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all rooms in dormitory
const getDormRooms = async (req, res) => {
  const { id } = req.params;

  try {
    const roomsList = await pool.query(
      `SELECT 
    room.id,
    room.number,
    room.floor,
    room.capacity,
    room.price,
    room.dormitory_id,
    COUNT(stay.user_id) AS tenant_amount,
    json_agg(
        json_build_object(
            'user_id', "user".id,
            'gender', contact.gender,
            'arrival_date', stay.arrival_date,
            'departure_date', stay.departure_date,
            'interests', (
                SELECT json_agg(interest.id)
                FROM user_interest
                JOIN interest ON user_interest.interest_id = interest.id
                WHERE user_interest.user_id = "user".id
            )
        )
    ) AS tenants
    FROM room
    JOIN dormitory ON room.dormitory_id = dormitory.id
    LEFT JOIN stay ON room.id = stay.room_id
    LEFT JOIN "user" ON stay.user_id = "user".id
    LEFT JOIN contact ON "user".id = contact.user_id
    WHERE room.dormitory_id = ($1)
    GROUP BY room.id`,
      [id]
    );
    res.status(200).json(roomsList.rows);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Post new dorm
const postDorm = async (req, res) => {
  const { address } = req.body;

  try {
    const insertDorm = await pool.query(
      `INSERT INTO dormitory (address) VALUES ($1) RETURNING *`,
      [address]
    );
    res.status(201).json(insertDorm.rows[0]);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update dorm
const putDorm = async (req, res) => {
  const { id } = req.params;
  const { address } = req.body;

  try {
    const updateDorm = await pool.query(
      `UPDATE dormitory SET address = ($1) WHERE id = ($2) RETURNING *`,
      [address, id]
    );
    if (updateDorm.rows.length <= 0) {
      res.status(404).json({ message: "Dorm not found" });
    } else {
      res.status(200).json(updateDorm.rows[0]);
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete dorm
const deleteDorm = async (req, res) => {
  const { id } = req.params;

  try {
    const result = pool.query(
      `DELETE FROM dormitory WHERE id = ($1) RETURNING *`,
      [id]
    );
    if (result.rowsCount === 0) {
      res.status(404).json({ message: "Dorm not found" });
    } else {
      res.status(200).json({ message: "Dormitory deleted" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getDorms, getDormRooms, postDorm, putDorm, deleteDorm };
