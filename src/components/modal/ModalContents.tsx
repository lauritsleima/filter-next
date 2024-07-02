import {CriteriaRow} from '@/components/CriteriaRow';
import React, {useContext, useState} from 'react';
import {Comparison, Criteria, Filter, TypeEnum} from '@/lib/types';
import {RefreshContext} from '@/context/RefreshContext';
import {deleteFilterById, upsertFilter} from '@/api/endpoints/filter';

type Props = {
  filter?: Filter;
  setIsModalOpen: (value: boolean) => void;
  handleClose: () => void;
}

export const ModalContents: React.FC<Props> = ({filter, setIsModalOpen, handleClose}) => {
  const [criteria, setCriteria] = useState<Criteria[]>(filter?.criteria || []);
  const [filterName, setFilterName] = useState(filter?.filterName ?? '')
  const {setRefresh} = useContext(RefreshContext);


  const handleCriteriaChange = (index: number, newCriteria: Criteria) => {
    const newCriteriaArray = [...criteria];
    newCriteriaArray[index] = newCriteria;
    setCriteria(newCriteriaArray);
  };

  const handleSave = async () => {
    if (!filterName) {
      alert('Filter name is required');
      return;
    }
    setIsModalOpen(false);
    const updatedFilter = filter === undefined ?
      {
        filterName: filterName,
        criteria: criteria
      } : {
        ...filter, criteria, filterName
      };

    await upsertFilter(updatedFilter);
    setRefresh(prev => {
      const newRefresh = !prev;
      console.log('New refresh state:', newRefresh); // Add this line
      return newRefresh;
    });

  };

  const handleAddNewCriterion = () => {
    setCriteria([...criteria, {
      type: TypeEnum.AMOUNT,
      comparison: Comparison.EQUAL,
      valueText: null,
      valueNumber: 0,
      valueDate: null
    }]);
  };

  const handleDeleteCriterion = (index: number) => {
    if (criteria.length === 1) {
      alert('Cannot delete the last criterion');
      return;
    }
    const newCriteriaArray = [...criteria];
    newCriteriaArray.splice(index, 1);
    setCriteria(newCriteriaArray);
  };

  const handleDeleteFilter = async () => {
    if (!filter?.filterId) {
      return;
    }
    await deleteFilterById(filter.filterId);
    setIsModalOpen(false);
    setRefresh(prev => !prev);
  }

  return (
    <>
      <div className={'modal_buttons'}>
        <input className={'input_filter_name'} value={filterName} placeholder={'Filter name'}
               onChange={(e) => setFilterName(e.target.value)}/>
        <button className={'button_add_new'} onClick={handleAddNewCriterion}>+ Add new criterion</button>
        <button className={'button_save'} onClick={handleSave}>Save filter</button>
        {filter?.filterId && <button className={'button_delete_filter'} onClick={handleDeleteFilter}>Delete filter</button>}
        <button className={'button_close'} onClick={handleClose}>Close</button>
      </div>
      <div>
        {criteria.map((criterion, index) => (
          <div key={index}>
            <CriteriaRow
              criteria={criterion}
              onCriteriaChange={(newCriteria) => handleCriteriaChange(index, newCriteria)}
              onDelete={() => handleDeleteCriterion(index)}
            />
          </div>
        ))}
      </div>
    </>
  )
}
