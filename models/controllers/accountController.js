import Account from '../models/Account.js';

// Kreiranje novog računa
export const createAccount = async (req, res) => {
    try {
        const { firstName, lastName, address, email, phoneNumber, jmbg, dateOfBirth, accountNumber, accountType, currency, bankName } = req.body;

        const newAccount = new Account({
            ownerId: req.user.id,  // ID prijavljenog korisnika
            firstName,
            lastName,
            address,
            email,
            phoneNumber,
            jmbg,
            dateOfBirth,
            accountNumber,
            accountType,
            currency,
            bankName,
            balance: 0  // Inicijalni saldo
        });

        await newAccount.save();

        // Nakon kreiranja računa, preusmerava na stranicu sa svim računima
        res.redirect('/accounts');  
    } catch (error) {
        res.status(500).json({ message: 'Error creating account', error });
    }
};

// Dohvati sve račune za prijavljenog korisnika
export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({ ownerId: req.user.id });  // Pronalazi sve račune korisnika
        res.render('account', { accounts });  // Renderuje 'account.ejs' i prosleđuje podatke o računima
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts', error });
    }
};

// Brisanje računa
export const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.redirect('/accounts');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting account', error });
    }
};

// Ažuriranje računa
export const updateAccount = async (req, res) => {
    try {
        const updatedAccount = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.redirect('/accounts');
    } catch (error) {
        res.status(500).json({ message: 'Error updating account', error });
    }
};
