import { View, Text, Pressable } from "react-native";
import React, { useRef, useState } from "react";

export default function RenderPostItem({ item }: { item: any }) {
  //   const lastItemId = useRef(item.someId);
  //   const [liked, setLiked] = useState(item.liked);
  //   if (item.someId !== lastItemId.current) {
  //     lastItemId.current = item.someId;
  //     setLiked(item.liked);
  //   }

  //   return (
  //     <Pressable onPress={() => setLiked(true)}>
  //       <Text>{liked}</Text>
  //     </Pressable>
  //   );
  // const lastItemId = useRef(item[1].userName);
  // console.log(lastItemId.current);
  return (
    <View>
      <Text>{item[1].userName}</Text>
      {/* {item[1].userName !== lastItemId.current ? <Text>Another</Text> : null} */}
    </View>
  );
}
