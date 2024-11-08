import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, ButtonImagePicker, ChoiceLocation, ContainerComponent, DataTimePicker, DropdownPicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import userAPI from '../apis/userApi';
import { SelectModel } from '../models/SelectModel';





// const initValues = {
//   title: '',
//   description:
//     '',
//   location: {
//     title: '',
//     address: '',
//   },
//   imageUrl: '',
//   user: [],
//   authorId: '',
//   startAt: Date.now(),
//   endAt: Date.now(),
//   date: Date.now(),
// };

const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  photoUrl: '',
  user: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
  category: '',
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);
  console.log(auth);
  
  const [eventData, setEventData] = useState<any>({ ...initValues, authorId: auth.id });



  const [userSelects, setUserSelects] = useState<SelectModel[]>([]);
  const [fileSelected, setFileSelected] = useState<any>();

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    // console.log(key, value);
    const items = { ...eventData };
    items[`${key}`] = value;
    setEventData(items);
  }
  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsers = async () => {
    const api = `/get-all`;
    try {
      const res:any = await userAPI.HandleUser(api);
      if(res && res.data){
        const items: SelectModel[] = [];
        res.data.forEach((item:any)=> item.email && items.push({
          label: item.email,
          value: item.id
        }));

        
        setUserSelects(items);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleAddEvent = async () => {
    console.log(eventData);
    // const res = await userAPI.HandleUser('/get-all');
    // console.log(res);
    
  }



  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent title text='Add new' />
      </SectionComponent>
      <SectionComponent>
        {eventData.photoUrl || fileSelected ? 
        <Image source={{uri:eventData.photoUrl ? eventData.photoUrl : fileSelected.uri}}
        style = {{width:'100%', height:250, marginBottom:12}} resizeMode='cover'/>
        :<></>}
        <ButtonImagePicker onSelect = {val => 
          val.type === 'url' ? 
          handleChangeValue('photoUrl', val.value as string):
          setFileSelected(val)}/>
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
        
        <DropdownPicker 
        label='Invite users'
        values = {userSelects} 
        onSelect={(val: string | string[])=> handleChangeValue('user', val as string[])}
        selected={eventData.user}
        multiple />
        <InputComponent
          placeholder='Title Address'
          allowClear
          value={eventData.location.title}
          onChange={val => handleChangeValue('location', { ...eventData.location, title: val })}
        />
        
        <ChoiceLocation />
        <InputComponent
          placeholder='Price'
          allowClear
          type = "number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent text='Add New' onPress={handleAddEvent} type='primary' />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen