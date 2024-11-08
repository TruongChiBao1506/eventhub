import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ChoiceLocation, ContainerComponent, DataTimePicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';




const initValues = {
  title: '',
  description:
    '',
  location: {
    title: '',
    address: '',
  },
  imageUrl: '',
  user: [''],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);
  const [eventData, setEventData] = useState<any>({ ...initValues, authorId: auth.id });




  const handleChangeValue = (key: string, value: string | Date) => {
    // console.log(key, value);
    const items = { ...eventData };
    items[`${key}`] = value;
    setEventData(items);
  }
  const handleAddEvent = async () => {
    console.log(eventData);

  }

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent title text='Add new' />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeholder='Title'
          allowClear
          value={eventData.title}
          onChange={val => handleChangeValue('title', val)} />
        <InputComponent
          placeholder='Description'
          multiline
          numberOfLines={3}
          allowClear
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
        />
        <RowComponent>
          <DataTimePicker
            label='Start at:'
            type='time'
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt} />
          <SpaceComponent width={20} />
          <DataTimePicker
            label='End at:'
            type='time'
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt} />
        </RowComponent>
        <DataTimePicker
          label='Date:'
          type='date'
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date} />
        <InputComponent
          placeholder='Title Address'
          allowClear
          value={eventData.location.title}
          onChange={() => { }}
        />
        <ChoiceLocation />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent text='Add New' onPress={handleAddEvent} type='primary' />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen