import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import themeStyles from './tree.theme.style';

import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { TreeDataState, CustomTreeData, SortingState, EditingState, IntegratedSorting, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableTreeColumn, TableEditColumn, PagingPanel } from '@devexpress/dx-react-grid-material-ui';

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }}
    title="Delete"
  >
    <DeleteIcon />
  </IconButton>
);

const commandComponents = {
  edit: EditButton,
  delete: DeleteButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};

class TreeTable extends React.Component {
  state = {
    tableColumnExtensions: [{
      columnName: 'name', width: 300
    }],
    actioned: 0,
    defaultExpandedRowIds: [0, 1],
    pageSizes: [5, 10, 20],
    editingRowIds: [],
    rows: []
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.state.actioned) {
      this.setState({
        rows: nextProps.rows,
      });
    }
  }

  deleteRow = (deleteId) => {
    this.setState({
      actioned: 1
    });
    this.props.delHandle(deleteId);
  }

  deleteRows = (deletedIds) => {
    const rowsForDelete = this.state.rows.slice();
    deletedIds.forEach((rowId) => {
      const index = rowsForDelete.findIndex(row => row.rowid === rowId);
      if (rowsForDelete[index].parentId) {
        if (index > -1) {
          this.deleteRow(rowsForDelete[index].id);
          rowsForDelete.splice(index, 1);
        }
      } else {
        alert('You can not delete the Root Group.');
      }
    });
    return rowsForDelete;
  };
  
  commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    const rows = this.state.rows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].rowid + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          rowid: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      //changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      changedRows = this.deleteRows(deleted);
    }
    this.setRows(changedRows);
  };

  setRows = (changedRows) => {
    this.setState({
      rows: changedRows
    })
  }

  render() {
    const { rows, defaultExpandedRowIds, pageSizes, tableColumnExtensions } = this.state;
    const { history } = this.props;

    const setEditingRowIds = (editIds) => {
      history.push(this.props.link + rows[editIds[0]].id);
    }

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={this.props.columns}
        >
          <EditingState
            editingRowIds={this.state.editingRowIds}
            onEditingRowIdsChange={setEditingRowIds}
            onCommitChanges={this.commitChanges}
          />
          <SortingState />
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={pageSizes[1]}
          />
          <TreeDataState
            defaultExpandedRowIds={defaultExpandedRowIds}
          />
          <CustomTreeData
            getChildRows={getChildRows}
          />
          <IntegratedPaging />
          <IntegratedSorting />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow
            showSortingControls
          />
          <TableTreeColumn
            for="name"
          />
          <TableEditColumn
            width={170}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
          <PagingPanel
            pageSizes={pageSizes}
          />
        </Grid>
      </Paper>
    );
  }
};

TreeTable.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  link: PropTypes.string.isRequired,
  delHandle: PropTypes.func,
};

export default withRouter(compose(withWidth(), withStyles(themeStyles, { withTheme: true }))(TreeTable));