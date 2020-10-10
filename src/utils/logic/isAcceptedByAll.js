const isAcceptedByAll = (acceptedBy) => Object.values(acceptedBy).every((val) => val === true);

export default isAcceptedByAll;
