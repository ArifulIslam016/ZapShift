import React, { use } from 'react';
import { Authcontext } from '../Context/Autncontext/Authcontext';

const useAuthhooks = () => {
    const Authinfo=use(Authcontext)
    return (
    Authinfo
    );
};

export default useAuthhooks;