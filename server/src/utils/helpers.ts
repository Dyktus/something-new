import * as bcrypt from 'bcryptjs';

export const hash_password = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

export const compare_password = (raw, hash) => bcrypt.compareSync(raw, hash);

