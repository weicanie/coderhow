import React, { useState } from 'react';
import { Checkbox } from 'antd';
import TagListWrapper from './style';
import getTagList from '@/services/modules/article/getTaglist';
import useFetchData from '@/hooks/useFetchData';
import { taglist_pass } from '../write';

/* const options = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
  },
]; */
/* const optionsWithDisabled = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
    disabled: false,
  },
]; */
const TagList = () => {
  const [tagList, setTagList] = useState([]);
  const [values, setValues] = useState([]);
  useFetchData(setTagList, {
    fetcher:getTagList,
  });
  const onChange = (checkedValues) => {
    setValues(checkedValues);
    taglist_pass(checkedValues)
  };
  return (
    <TagListWrapper>
      <Checkbox.Group options={tagList} onChange={onChange} />
      {/*     <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} /> */}
      {/*     <Checkbox.Group
            options={optionsWithDisabled}
            disabled
            defaultValue={['Apple']}
            onChange={onChange}
      /> */
      }
    </TagListWrapper>
  );
}
export default TagList;