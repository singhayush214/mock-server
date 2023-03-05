'use strict';

import User from './user.model';


export async function fetchAll(req, res) {
  const filter = {};

  try {
    const [list, count] = await Promise.all([
      User.find(filter).sort({ 'createdAt': -1 }).lean(),
      User.countDocuments(filter)
    ]);
    
    if (!list.length) return res.send([]);
    console.log({ count });
    return res.send(list);
  } catch (error) {
    return res.status(500).send({ message: error.message || 'Internal Error' });
  }
}


export async function create(req, res) {
  try {
    const list = req.body;


    const created = await User.create(list);
    console.log({ created });

    return res.status(201).send({ message: 'Created Successfully '});

  } catch (error) {
    return res.status(500).send({ message: error.message || 'Internal Error' });
  }
}

