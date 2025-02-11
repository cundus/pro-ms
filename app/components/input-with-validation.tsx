// import {
//   Control,
//   FieldValues,
//   UseControllerProps,
//   UseFormReturn,
// } from 'react-hook-form'
// import clsx from 'clsx'

// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from './ui/form'
// import { Input } from './ui/input'

// interface InputWithValidationProps<T extends FieldValues> {
//   label: string
//   actionData?: { message: string }
//   control: Control<any>
//   name: string
// }

// function InputWithValidation<T extends FieldValues>({
//   actionData,
//   ...props
// }: InputWithValidationProps<T>) {
//   return (
//     <FormField
//       control={props.control}
//       name={props.name}
//       render={({ field,fieldState }) => (
//         <FormItem>
//           <FormLabel>{props.label}</FormLabel>
//           <FormControl>
//             <Input
//               {...props}
//               {...field}
//               className={clsx({ 'border-red-600': fieldState.error?.message })}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }

// export default InputWithValidation
