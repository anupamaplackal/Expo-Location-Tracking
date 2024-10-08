import colours from '@common/colours';
import { borderRadius } from '@common/constants';
import { Fonts } from '@hooks/utils/useLoadFonts';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface OTPInputProps extends TextInputProps {
  length: number;
  onComplete?: (otp: string) => void;
  onChangeOTP?: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onComplete,
  onChangeOTP,
  ...rest
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<TextInput[]>([]);

  // Update the otp array when length changes
  useEffect(() => {
    setOtp(Array(length).fill(''));
  }, [length]);

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    onChangeOTP?.(newOtp.join(''));

    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
    if (newOtp.join('').length === length) {
      onComplete?.(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.parent}>
      {otp.map((digit, index: number) => (
        <TextInput
          key={index}
          ref={(ref: any) => (inputs.current[index] = ref!)}
          value={digit}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType='numeric'
          maxLength={1}
          style={[
            styles.input,
            {
              width:
                Dimensions.get('window').width / length -
                Dimensions.get('window').width / length / 4,
            },
          ]}
          {...rest}
          placeholder='-'
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  input: {
    backgroundColor: colours.white,
    fontFamily: Fonts.LexendRegular,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: colours.textColor,
    borderRadius: borderRadius.large,
    textAlign: 'center',
    fontSize: 40,
  },
  container: {
    width: 50,
    height: 65,
    borderWidth: 0,
    borderColor: colours.black,
    borderRadius: borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});

export default OTPInput;
