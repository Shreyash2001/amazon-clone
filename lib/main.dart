import 'package:amazon/constants/global_variables.dart';
import 'package:amazon/features/auth/screens/auth_screen.dart';
import 'package:amazon/features/auth/services/auth_service.dart';
import 'package:amazon/providers/user_provider.dart';
import 'package:amazon/router.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(
      create: (context) => UserProvider(),
    ),
  ], child: const MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final AuthService authService = AuthService();
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Amazon',
      theme: ThemeData(
        scaffoldBackgroundColor: GlobalVariables.backgroundColor,
        colorScheme: ColorScheme.light(primary: GlobalVariables.secondaryColor),
        appBarTheme: const AppBarTheme(
          elevation: 0,
          iconTheme: IconThemeData(color: Colors.black),
        ),
      ),
      debugShowCheckedModeBanner: false,
      onGenerateRoute: (settings) => generateRoute(settings),
      home: const AuthScreen(),
    );
  }
}

// class MyApp extends StatefulWidget {
//   const MyApp({super.key});
//
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Amazon',
//       theme: ThemeData(
//         scaffoldBackgroundColor: GlobalVariables.backgroundColor,
//         colorScheme: ColorScheme.light(primary: GlobalVariables.secondaryColor),
//         appBarTheme: const AppBarTheme(
//           elevation: 0,
//           iconTheme: IconThemeData(color: Colors.black),
//         ),
//       ),
//       debugShowCheckedModeBanner: false,
//       onGenerateRoute: (settings) => generateRoute(settings),
//       home: const AuthScreen(),
//     );
//   }
// }
