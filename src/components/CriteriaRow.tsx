import React, {useEffect, useState} from 'react';
import {Comparison, Criteria, TypeEnum} from '@/lib/types';

type Props = {
  criteria: Criteria;
  onCriteriaChange: (newCriteria: Criteria) => void;
  onDelete: () => void;
}

export const CriteriaRow: React.FC<Props> = ({criteria, onCriteriaChange, onDelete}) => {
  const [localCriteria, setLocalCriteria] = useState<Criteria>(criteria);

  useEffect(() => {
    setLocalCriteria(criteria);
  }, [criteria]);

  const onUpdateCriteria = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (criteria.type.toUpperCase()) {
      case TypeEnum.TEXT.toUpperCase():
        onCriteriaChange({...criteria, valueText: event.target.value});
        break;
      case TypeEnum.AMOUNT.toUpperCase():
        onCriteriaChange({...criteria, valueNumber: Number(event.target.value), valueText: null, valueDate: null});
        break;
      case TypeEnum.DATE.toUpperCase():
        onCriteriaChange({...criteria, valueDate: event.target.value, valueText: null, valueNumber: null});
        break;
      default:
        onCriteriaChange({...criteria, valueText: event.target.value});
    }
  }

  const handleComparisonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCriteriaChange({...criteria, comparison: event.target.value as Comparison});
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCriteriaChange({...criteria, type: event.target.value as TypeEnum});
  }

  const inputByType = (type) => {
    switch (type.toUpperCase()) {
      case TypeEnum.TEXT:
        return (
          <input
            className={'criteria_value'}
            value={criteria.valueText || ''}
            onChange={(e) => onUpdateCriteria(e)}
          />
        );
      case TypeEnum.AMOUNT:
        return (
          <input
            className={'criteria_value'}
            type={'number'} value={criteria.valueNumber || ''}
            onChange={(e) => onUpdateCriteria(e)}
          />
        );
      case TypeEnum.DATE:
        return (
          <input
            className={'criteria_value'}
            type={'date'} value={criteria.valueDate || ''}
            onChange={(e) => onUpdateCriteria(e)}
          />
        );
      default:
        return (
          <input
            className={'criteria_value'}
            value={criteria.valueText || ''}
            onChange={(e) => onUpdateCriteria(e)}
          />
        );
    }
  }

  const criteriaType = () => {
    return (
      <select
        className={'criteria_type'}
        value={criteria.type}
        onChange={handleTypeChange}
      >
        {Object.values(TypeEnum).map((type) =>
          type.toUpperCase() === criteria.type.toUpperCase()
            ?
            <option key={type} value={criteria.type}>{type}</option>
            :
            <option key={type}>{type}</option>
        )}
      </select>
    );
  }

  const criteriaComparison = () => {
    return (
      <select
        className={'criteria_comparison'}
        value={criteria.comparison}
        onChange={handleComparisonChange}
      >
        {Object.values(Comparison).map((comparison) =>
          <option key={comparison}>{comparison}</option>
        )}
      </select>
    );
  }

  return (
    <div className={'criteria_row'}>
      {criteriaType()}
      {criteriaComparison()}
      {inputByType(criteria.type)}
      <button className={'button_delete_criterion'} onClick={onDelete}>-</button>
    </div>
  )
}
