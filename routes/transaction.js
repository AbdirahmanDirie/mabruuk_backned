const { addExpense, getExpense, } = require('../controllers/expense');
const { addIncome, getIncomes, } = require('../controllers/income');
const {create, getTotalExpense, getTotalIncome, getIncomeExpenseSum, getAll, update, deleteTransaction} = require('../controllers/transaction');
const router = require('express').Router();
const {protect} = require('../middlewares/verifyToken')

router.post('/add-income',protect, addIncome)
    .get('/get-incomes',protect, getIncomes)
    .post('/add-expense',protect, addExpense)
    .get('/get-expenses',protect, getExpense)
    .get('/expense',protect, getTotalExpense)
    .get('/income',protect, getTotalIncome)
    .get('/',protect, getAll)
    .get('/sum',protect, getIncomeExpenseSum)
    .post('/create',protect, create)
    .put('/update/:id',protect, update)
    .delete('/delete/:id',protect, deleteTransaction)

module.exports = router