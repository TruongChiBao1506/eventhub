import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, ButtonImagePicker, ChoiceLocation, ContainerComponent, DateTimePicker, DropdownPicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import userAPI from '../apis/userApi';
import { SelectModel } from '../models/SelectModel';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { Validate } from '../utils/validate';
import { appColors } from '../constants/appColor';
import storage from '@react-native-firebase/storage';
import { EventModel } from '../models/EventModel';
import eventAPI from '../apis/eventApi';




// // const initValues = {
// //   title: '',
// //   description:
// //     '',
// //   location: {
// //     title: '',
// //     address: '',
// //   },
// //   imageUrl: '',
// //   user: [],
// //   authorId: '',
// //   startAt: Date.now(),
// //   endAt: Date.now(),
// //   date: Date.now(),
// // };

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
  const [errorsMess, setErrorsMess] = useState<string[]>([]);

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    // console.log(key, value);
    const items = { ...eventData };
    items[`${key}`] = value;
    setEventData(items);
  }
  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    const mess = Validate.EventValidation(eventData);
    setErrorsMess(mess);
  }, [eventData]);

  const handleGetAllUsers = async () => {
    const api = `/get-all`;
    try {
      const res: any = await userAPI.HandleUser(api);
      if (res && res.data) {
        const items: SelectModel[] = [];
        res.data.forEach((item: any) => item.email && items.push({
          label: item.email,
          value: item.id
        }));


        setUserSelects(items);
      }
    } catch (error) {
      console.log(error);

    }
  }

  const handleLocation = (val: any) => {
    const items = { ...eventData };
    // items.position = val.postion;
    items.locationAddress = val;

    setEventData(items);
  };

  const handleAddEvent = async () => {
    // console.log(eventData);
    // const res = await userAPI.HandleUser('/get-all');
    // console.log(res);
    if (fileSelected) {
      const filename = `${fileSelected.filename ?? `image-${Date.now()}`}.${fileSelected.path.split('.')[1]}`;
      const path = `images/${filename}`;
      const res = storage().ref(path).putFile(fileSelected.path);
      res.on('state_changed', snapshot => {
        console.log(snapshot.bytesTransferred);
        
      }, error => {
        console.log(error);
        
      }, ()=>{
        storage().ref(path).getDownloadURL().then(url => {
          eventData.photoUrl = url;
          handlePustEvent(eventData);
        })
      })
    }
    else {
      handlePustEvent(eventData);
    }
  }

  const handlePustEvent = async (event: EventModel)=>{
      console.log(event);
      const api = `/add-new`;
      try {
        const res = await eventAPI.HandleEvent(api, event, 'post');
        
        console.log(res);
        
      } catch (error) {
        console.log(error);
        
      }
      
  }

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('photoUrl', val.path);
  }


  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent title text='Add new' />
      </SectionComponent>
      <SectionComponent>
        {eventData.photoUrl || fileSelected ?
          <Image source={{ uri: eventData.photoUrl ? eventData.photoUrl : fileSelected.uri }}
            style={{ width: '100%', height: 250, marginBottom: 12 }} resizeMode='cover' />
          : <></>}
        <ButtonImagePicker onSelect={val =>
          val.type === 'url' ?
            handleChangeValue('photoUrl', val.value as string) :
            handleFileSelected(val.value as ImageOrVideo)} />
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
        <DropdownPicker selected={eventData.category} values={[
          {
            label: 'Sport',
            value: 'sport',
          },
          {
            label: 'Food',
            value: 'food',
          },
          {
            label: 'Art',
            value: 'art',
          },
          {
            label: 'Music',
            value: 'music',
          },

        ]} onSelect={val => handleChangeValue('category', val)} />

        <RowComponent>
          <DateTimePicker
            label='Start at:'
            type='time'
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt} />
          <SpaceComponent width={20} />
          <DateTimePicker
            label='End at:'
            type='time'
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt} />
        </RowComponent>
        <DateTimePicker
          label='Date:'
          type='date'
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date} />

        <DropdownPicker
          label='Invite users'
          values={userSelects}
          onSelect={(val: string | string[]) => handleChangeValue('user', val as string[])}
          selected={eventData.user}
          multible />
        <InputComponent
          placeholder='Title Address'
          allowClear
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
        />

        <ChoiceLocation onSelect={val => handleLocation(val)} />
        <InputComponent
          placeholder='Price'
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>

      {errorsMess.length > 0 && (
        <SectionComponent>
          {errorsMess.map(mess => (
            <TextComponent
              text={mess}
              key={mess}
              color={appColors.danger}
              styles={{ marginBottom: 12 }}
            />
          ))}
        </SectionComponent>
      )}

      <SectionComponent>
        <ButtonComponent
          disable={errorsMess.length > 0}
          text='Add New'
          onPress={handleAddEvent}
          type='primary' />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen

// import { View, Text } from 'react-native'
// import React from 'react'

// const AddNewScreen = () => {
//   return (
//     <View>
//       <Text>AddNewScreen</Text>
//     </View>
//   )
// }

// export default AddNewScreen

