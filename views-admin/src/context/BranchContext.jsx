import React, { createContext, useState } from 'react';

const BranchContext = createContext({
  selectedBranch: null,
  setSelectedBranch: (branch) => { },
});

const BranchProvider = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState('Trans Studio Mall Bandung');

  const value = {
    setSelectedBranch,
    selectedBranch,
  };

  return <BranchContext.Provider value={value}>{children}</BranchContext.Provider>;
};

export { BranchContext, BranchProvider };