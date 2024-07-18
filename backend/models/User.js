const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('mydb', 'root', 'shambhavisql', {
  host: '127.0.0.1',
  port: 3308,
  dialect: 'mysql'
});

// Define Doctor model
const Doctor = sequelize.define('Doctor', {
  doctor_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doctor_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doctor_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialisation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctor_password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'doctors',
  timestamps: false
});

// Define Patient model
const Patient = sequelize.define('Patient', {
  patient_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patient_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patient_age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  patient_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patient_password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'patients',
  timestamps: false
});

const Conversation = sequelize.define('Conversation', {
  convo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: false // Not a primary key
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // doctor_id is part of the composite primary key
    references: {
      model: 'doctors',
      key: 'doctor_id'
    }
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // patient_id is part of the composite primary key
    references: {
      model: 'patients',
      key: 'patient_id'
    }
  }
}, {
  tableName: 'conversations',
  timestamps: false
});


const Text = sequelize.define('Text', {
  text_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  convo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'conversations',
      key: 'convo_id'
    }
  },
  sender_type: {
    type: DataTypes.ENUM('doctor', 'patient'),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'texts',
  timestamps: false
});

Doctor.hasMany(Conversation, { foreignKey: 'doctor_id' });
Patient.hasMany(Conversation, { foreignKey: 'patient_id' });
Conversation.belongsTo(Doctor, { foreignKey: 'doctor_id' });
Conversation.belongsTo(Patient, { foreignKey: 'patient_id' });

Conversation.hasMany(Text, { foreignKey: 'convo_id', sourceKey: 'doctor_id' });
Conversation.hasMany(Text, { foreignKey: 'convo_id', sourceKey: 'patient_id' });
Text.belongsTo(Conversation, { foreignKey: 'convo_id', targetKey: 'doctor_id' });
Text.belongsTo(Conversation, { foreignKey: 'convo_id', targetKey: 'patient_id' });

module.exports = { Doctor, Patient, Conversation, Text, sequelize };
