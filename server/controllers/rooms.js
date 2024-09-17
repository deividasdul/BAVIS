import pool from "../db/db.js";

const getRooms = async (_, res) => {
  try {
    const roomData = await pool.query(`SELECT * FROM room ORDER BY id ASC`);
    res.json(roomData.rows);
  } catch (e) {
    console.error(e.message);
  }
};

const getRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const roomInfo = await pool.query(`SELECT * FROM room WHERE id = ($1)`, [
      id,
    ]);
    res.json(roomInfo.rows);
  } catch (e) {
    console.error(e.message);
  }
};

const postRoom = async (req, res) => {
  const { number, floor, capacity, price, dormitory_id } = req.body;

  try {
    const insertRoom = await pool.query(
      `INSERT INTO room (number, floor, capacity, price, dormitory_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [number, floor, capacity, price, dormitory_id]
    );
    res.json(insertRoom.rows);
  } catch (e) {
    console.error(e.message);
  }
};

const putRoom = async (req, res) => {
  const { id } = req.params;
  const { number, floor, capacity, price, dormitory_id } = req.body;

  try {
    const updateRoom = await pool.query(
      `UPDATE room SET number = ($1), floor = ($2), capacity = ($3), price = ($4), dormitory_id = ($5) WHERE id = ($6) RETURNING *`,
      [number, floor, capacity, price, dormitory_id, id]
    );
    res.json(updateRoom.rows);
  } catch (e) {
    console.error(e.message);
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM room WHERE id = ($1)`, [id]);
    res.json({ message: "Room deleted" });
  } catch (e) {
    console.error(e.message);
  }
};

export { getRooms, getRoom, postRoom, putRoom, deleteRoom };
