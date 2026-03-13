// Database Model for FCA Refugee Support System
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

class Database {
  constructor() {
    this.dbPath = path.join(__dirname, "../../database/refugees.db");
    this.init();
  }

  init() {
    // Create database directory if it doesn't exist
    const fs = require("fs");
    const dbDir = path.dirname(this.dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // Initialize database connection
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
      } else {
        console.log(" Connected to SQLite database");
        this.createTables();
      }
    });
  }

  createTables() {
    const createBeneficiariesTable = `
            CREATE TABLE IF NOT EXISTS beneficiaries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                date_of_birth DATE NOT NULL,
                gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
                place_of_birth TEXT NOT NULL,
                nationality TEXT NOT NULL,
                marital_status TEXT NOT NULL,
                settlement_camp TEXT NOT NULL,
                date_of_registration DATE NOT NULL,
                date_of_joining DATE NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;

    this.db.run(createBeneficiariesTable, (err) => {
      if (err) {
        console.error("Error creating beneficiaries table:", err.message);
      } else {
        console.log(" Beneficiaries table ready");
      }
    });
  }

  // Insert new beneficiary
  insertBeneficiary(beneficiaryData) {
    return new Promise((resolve, reject) => {
      const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        placeOfBirth,
        nationality,
        maritalStatus,
        settlementCamp,
        dateOfRegistration,
        dateOfJoining,
      } = beneficiaryData;

      const sql = `
                INSERT INTO beneficiaries (
                    first_name, last_name, date_of_birth, gender, place_of_birth,
                    nationality, marital_status, settlement_camp, 
                    date_of_registration, date_of_joining
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

      const params = [
        firstName,
        lastName,
        dateOfBirth,
        gender,
        placeOfBirth,
        nationality,
        maritalStatus,
        settlementCamp,
        dateOfRegistration,
        dateOfJoining,
      ];

      this.db.run(sql, params, function (err) {
        if (err) {
          console.error("Error inserting beneficiary:", err.message);
          reject(err);
        } else {
          console.log(` New beneficiary registered with ID: ${this.lastID}`);
          resolve({
            id: this.lastID,
            success: true,
            message: "Beneficiary registered successfully",
          });
        }
      });
    });
  }

  // Get all beneficiaries
  getAllBeneficiaries() {
    return new Promise((resolve, reject) => {
      const sql = `
                SELECT * FROM beneficiaries 
                ORDER BY created_at DESC
            `;

      this.db.all(sql, [], (err, rows) => {
        if (err) {
          console.error("Error fetching beneficiaries:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Get beneficiary by ID
  getBeneficiaryById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM beneficiaries WHERE id = ?`;

      this.db.get(sql, [id], (err, row) => {
        if (err) {
          console.error("Error fetching beneficiary:", err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Get beneficiaries by settlement camp
  getBeneficiariesByCamp(camp) {
    return new Promise((resolve, reject) => {
      const sql = `
                SELECT * FROM beneficiaries 
                WHERE settlement_camp = ? 
                ORDER BY created_at DESC
            `;

      this.db.all(sql, [camp], (err, rows) => {
        if (err) {
          console.error("Error fetching beneficiaries by camp:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Get statistics
  getStatistics() {
    return new Promise((resolve, reject) => {
      const queries = {
        total: `SELECT COUNT(*) as count FROM beneficiaries`,
        byGender: `
                    SELECT gender, COUNT(*) as count 
                    FROM beneficiaries 
                    GROUP BY gender
                `,
        byCamp: `
                    SELECT settlement_camp, COUNT(*) as count 
                    FROM beneficiaries 
                    GROUP BY settlement_camp 
                    ORDER BY count DESC
                `,
        byNationality: `
                    SELECT nationality, COUNT(*) as count 
                    FROM beneficiaries 
                    GROUP BY nationality 
                    ORDER BY count DESC
                `,
        recentRegistrations: `
                    SELECT COUNT(*) as count 
                    FROM beneficiaries 
                    WHERE date_of_registration >= date('now', '-30 days')
                `,
      };

      const stats = {};
      let completed = 0;
      const totalQueries = Object.keys(queries).length;

      Object.entries(queries).forEach(([key, sql]) => {
        if (key === "total" || key === "recentRegistrations") {
          this.db.get(sql, [], (err, row) => {
            if (err) {
              console.error(`Error in ${key} query:`, err.message);
              stats[key] = 0;
            } else {
              stats[key] = row.count;
            }
            completed++;
            if (completed === totalQueries) {
              resolve(stats);
            }
          });
        } else {
          this.db.all(sql, [], (err, rows) => {
            if (err) {
              console.error(`Error in ${key} query:`, err.message);
              stats[key] = [];
            } else {
              stats[key] = rows;
            }
            completed++;
            if (completed === totalQueries) {
              resolve(stats);
            }
          });
        }
      });
    });
  }

  // Validate beneficiary data
  validateBeneficiaryData(data) {
    const errors = [];
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      placeOfBirth,
      nationality,
      maritalStatus,
      settlementCamp,
      dateOfRegistration,
      dateOfJoining,
    } = data;

    // Required field validation
    if (!firstName || firstName.length < 2) {
      errors.push("First name is required and must be at least 2 characters");
    }
    if (!lastName || lastName.length < 2) {
      errors.push("Last name is required and must be at least 2 characters");
    }
    if (!placeOfBirth || placeOfBirth.length < 2) {
      errors.push(
        "Place of birth is required and must be at least 2 characters",
      );
    }
    if (!dateOfBirth) {
      errors.push("Date of birth is required");
    }
    if (!gender || !["male", "female"].includes(gender)) {
      errors.push("Gender is required and must be male or female");
    }
    if (!nationality) {
      errors.push("Nationality is required");
    }
    if (!maritalStatus) {
      errors.push("Marital status is required");
    }
    if (!settlementCamp) {
      errors.push("Settlement camp is required");
    }
    if (!dateOfRegistration) {
      errors.push("Date of registration is required");
    }
    if (!dateOfJoining) {
      errors.push("Date of joining settlement camp is required");
    }

    // Date validation
    if (dateOfBirth && dateOfRegistration) {
      const birthDate = new Date(dateOfBirth);
      const regDate = new Date(dateOfRegistration);
      if (birthDate >= regDate) {
        errors.push("Date of birth must be before date of registration");
      }
    }

    if (dateOfRegistration && dateOfJoining) {
      const regDate = new Date(dateOfRegistration);
      const joinDate = new Date(dateOfJoining);
      if (joinDate <= regDate) {
        errors.push(
          "Date of joining settlement camp must be after date of registration",
        );
      }
    }

    return errors;
  }

  // Close database connection
  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error("Error closing database:", err.message);
        } else {
          console.log(" Database connection closed");
        }
      });
    }
  }
}

module.exports = Database;
