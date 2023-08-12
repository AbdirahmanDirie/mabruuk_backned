const IncomeExpense = require('../models/transaction');

exports.create = async (req, res) => {
  try {
    const incomeExpense = new IncomeExpense(req.body);
    await incomeExpense.save();

    res.status(201).json(incomeExpense);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const incomeExpenses = await IncomeExpense.find();
    res.status(200).json(incomeExpenses);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const incomeExpense = await IncomeExpense.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!incomeExpense) {
      throw new Error('IncomeExpense not found');
    }

    res.status(200).json(incomeExpense);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await IncomeExpense.findByIdAndDelete(req.params.id, req.body, {new: true});

    if (!deleted) {
      throw new Error('IncomeExpense not found');
    }

    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.getTotalIncome = async (req, res) => {
    try {
      const totalIncome = await IncomeExpense.aggregate([{ $match: { type: 'income' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
  
      res.status(200).json(totalIncome.length ? totalIncome[0].total : 0);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  
  exports.getTotalExpense = async (req, res) => {
    try {
      const totalExpense = await IncomeExpense.aggregate([{ $match: { type: 'expense' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
  
      res.status(200).json(totalExpense.length ? totalExpense[0].total : 0);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };

  exports.getAll = async (req, res) => {
    try {
      const incomeExpense = await IncomeExpense.find()
  
      res.status(200).json(incomeExpense);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  
  
  exports.getIncomeExpenseSum = async (req, res) => {
    try {
      const totalIncome = await IncomeExpense.aggregate([{ $match: { type: 'income' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
      const totalExpense = await IncomeExpense.aggregate([{ $match: { type: 'expense' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
  
      const income = totalIncome.length ? totalIncome[0].total : 0;
      const expense = totalExpense.length ? totalExpense[0].total : 0;
      const incomeExpenseSum = income - expense;
  
      // res.status(200).json({ income, expense, incomeExpenseSum });
      res.status(200).json( incomeExpenseSum);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };