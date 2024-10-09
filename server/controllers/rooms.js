import pool from "../db/db.js";

// Get all rooms
const getRooms = async (_, res) => {
  try {
    const roomsList = await pool.query(`SELECT * FROM room ORDER BY id ASC`);
    res.status(200).json(roomsList.rows);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get one room
const getRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const roomInfo = await pool.query(`SELECT * FROM room WHERE id = ($1)`, [
      id,
    ]);
    if (roomInfo.rows.length <= 0) {
      res.status(404).json({ message: "Room not found" });
    } else {
      res.status(200).json(roomInfo.rows[0]);
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Post new room
const postRoom = async (req, res) => {
  const { number, floor, capacity, price, dormitory_id } = req.body;

  try {
    const insertRoom = await pool.query(
      `INSERT INTO room (number, floor, capacity, price, dormitory_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [number, floor, capacity, price, dormitory_id]
    );
    res.status(201).json(insertRoom.rows[0]);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update room
const putRoom = async (req, res) => {
  const { id } = req.params;
  const { number, floor, capacity, price, dormitory_id } = req.body;

  try {
    const updateRoom = await pool.query(
      `UPDATE room SET number = ($1), floor = ($2), capacity = ($3), price = ($4), dormitory_id = ($5) WHERE id = ($6) RETURNING *`,
      [number, floor, capacity, price, dormitory_id, id]
    );
    if (updateRoom.rows.length <= 0) {
      res.status(404).json({ message: "Room not found" });
    } else {
      res.status(200).json(updateRoom.rows[0]);
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM room WHERE id = ($1) RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Room not found" });
    } else {
      res.status(200).json({ message: "Room deleted" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getRooms, getRoom, postRoom, putRoom, deleteRoom };
