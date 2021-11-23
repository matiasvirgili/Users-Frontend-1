import React from 'react';
import { UserList } from './UserList';
import styles from './UserScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { UserForm } from './UserForm';
import { setCreateAction } from '../../redux/actions/usersAction';

export const UserScreen = () => {
  const dispatch = useDispatch();
  const {
    list: users,
    isLoading,
    actionInProgress,
    selectedUser,
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };

  return (
    <div>
      <h2>Users</h2>
      <button className={styles.newButton} onClick={handleAddClick}>
        New User
      </button>
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <UserForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete user={selectedUser} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <UserList users={users} />
    </div>
  );
};
