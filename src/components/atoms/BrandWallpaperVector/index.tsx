import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const BrandWallpaperVector: React.FC<models.SvgProps> = ({ width, height }) => {
  const brandWallpaperVectorSvg = `<svg width="375" height="285" viewBox="0 0 375 285" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_85_295)">
  <path d="M108.968 289.919L398.494 100.347L587.609 389.179L298.659 578.87L108.968 289.919Z" fill="#BE8547"/>
  <path opacity="0.5" d="M154.163 322.993L443.688 133.422L632.804 422.253L343.853 611.944L154.163 322.993Z" fill="#3F1704"/>
  </g>
  <defs>
  <clipPath id="clip0_85_295">
  <rect width="375" height="285" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  
    `;

  return (
    <View>
      <SvgXml xml={brandWallpaperVectorSvg} width={width} height={height} />
    </View>
  );
};

export default BrandWallpaperVector;
