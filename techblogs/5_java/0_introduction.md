# Java : Basics & Introduction

###### 4 Stages of Becoming a Programmer

1. **Unconscious Incompetence:** Decisions are hard to make.
2. **Conscious Incompetence:** Recognizing the skills needed.
3. **Conscious Competence:** Training is now starting to make sense.
4. **Unconscious Competence:** Ultimate level - where we want to be, programming become second nature.

###### Tips for Self-Taught Software Developers

1. Best Practices
2. Create a project and put it on GitHub: Something to show to prospective employers.
3. Study other people code

## About Java

1. [**Java is a simple language.**]()
    - Java is easy to learn and its syntax is clear and concise. 
    - It is based on C++ (so it is easier for programmers who know C++). 
    - Java has removed many confusing and rarely-used features e.g. explicit pointers, operator overloading etc. 
    - Java also takes care of memory management and it also provides an automatic garbage collector. 
    - This collects the unused objects automatically.
2. [**Java is a platform-independent language.**]()
    - Java programs after compilation, are converted into an intermediate level language called the **bytecode**.
    - **bytecode** is a part of the Java platform irrespective of the machine on which the programs run. 
    - This makes java highly portable as its bytecodes can be run on any machine by an interpreter called the **JVM**.
    - Thus java provides **'reusability of code'**.
3. [**Java is an object-oriented (OOP) programming language.**]()
    - OOP makes the complete program simpler by dividing it into a number of objects. 
    - The objects can be used as a bridge to have data flow from one function to another. 
    - We can easily modify data and function’s as per the requirements of the program.
4. [**Java is a robust language.**]()
    - Java programs must be reliable because they are used in both consumer and mission-critical applications.
    - Ranging from Blu-ray players to navigation systems.
5. [**Java is a multithreaded language.**]()
    - Java can perform many tasks at once by defining multipe threads. 
    - ***Example:*** A program that manages a Graphical User Interface (GUI) while waiting for input from a network connection uses another thread to perform and wait’s instead of using the default GUI thread for both tasks. This keeps the GUI responsive.
6. [**Java programs can create applets.**]()
    - Applets are programs that run in web browsers.
7. [**Java does not require any preprocessor.**]()
    - It does not require inclusion of header files for creating a Java application.



## Naming Conventions

#### 1. Packages:

- The prefix of a unique package name is always written in **all-lowercase ASCII letters** and should be one of the top-level domain names, like com, edu, gov, mil, net, org.
- Subsequent components of the package name vary according to an organisation’s own internal naming conventions.

```java
com.sun.eng
com.apple.quicktime.v2

// java.lang packet in JDK
java.lang
```

#### 2. Classes and Interfaces:

- Class names should be **nouns**, in mixed case with the **first** letter of each internal word capitalised. Interfaces name should also be capitalised just like class names.
- Use whole words and must avoid acronyms and abbreviations.

```java
interface  Bicycle
class MountainBike implements Bicyle

interface Sport
class Football implements Sport
```

#### 3. Methods:

- Methods should be **verbs**, in mixed case with the **first letter lowercase** and with the first letter of each internal word capitalised.

```java
void changeGear(int newValue);
void speedUp(int increment);
void applyBrakes(int decrement);
```

#### 4. Variables: 

- Variable names should be short yet meaningful.
- Should **not** start with underscore(‘_’) or dollar sign ‘$’ characters.
- Should be mnemonic i.e, designed to indicate to the casual observer the intent of its use.
- **One-character variable names should be avoided** except for temporary variables.
- Common names for temporary variables are i, j, k, m, and n for integers; c, d, and e for characters.

```java
// variables for MountainBike class
int speed = 0;
int gear = 1;
```

#### 5. Constant variables:

- Should be **all uppercase** with words separated by underscores (“_”).
- There are various constants used in predefined classes like Float, Long, String etc.

```java
static final int MIN_WIDTH = 4;

// Some  Constant variables used in predefined Float class
public static final float POSITIVE_INFINITY = 1.0f / 0.0f;
public static final float NEGATIVE_INFINITY = -1.0f / 0.0f;
public static final float NaN = 0.0f / 0.0f;
```







## Handling Java Installation and Un-installation

This article will tell you how to install / uninstall multiple java versions on mac os both use home brew or manually. It also show you how to set **JAVA_HOME** & **PATH** system environment variable to make your installed jdk as the default jdk. We recommend you to use home brew, because it provide a lot of easy to use tools.

### 1. Use Home Brew To Install & Uninstall Java On Mac OS X.

#### 1.1 Use Brew Cask Command To Install Java JDK.

1. Install HomeBrew on your mac os, please read article [How To Install Homebrew On Mac OS](https://www.dev2qa.com/how-to-install-homebrew-on-mac-os/).

2. Run below command to install home brew cask extension, cask extension tool can help you to install and manage software package easily.

    ```
    $ brew tap homebrew/cask-versions
    Updating Homebrew...
    ==> Auto-updated Homebrew!
    Updated 1 tap (homebrew/core).
    ==> Updated Formulae
    node-build
    ==> Tapping homebrew/cask-versions
    Cloning into '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask-versions'...
    remote: Enumerating objects: 198, done.
    remote: Counting objects: 100% (198/198), done.
    remote: Compressing objects: 100% (194/194), done.
    remote: Total 198 (delta 9), reused 29 (delta 1), pack-reused 0
    Receiving objects: 100% (198/198), 84.76 KiB | 221.00 KiB/s, done.
    Resolving deltas: 100% (9/9), done.
    Tapped 169 casks (216 files, 324.9KB).
    ```

    

3. Run [`brew search java`]() or [ `brew search jdk`]() command to find your desired java or jdk version.

    Below is search result for [ `brew search java`]() command.

    ```
    $ brew search java
    ==> Formulae
    app-engine-java                                     google-java-format                                  javarepl                                            jslint4java                                         libreadline-java
    ==> Casks
    charles-applejava      eclipse-java           eclipse-javascript     java ✔                 java-beta              java11                 java6                  netbeans-java-ee       netbeans-java-se       oracle-jdk-javadoc     yourkit-java-profiler
    charles-applejava      eclipse-java           eclipse-javascript     java ✔                 java-beta              java11                 java6                  netbeans-java-ee       netbeans-java-se       oracle-jdk-javadoc     yourkit-java-profiler
    ```

    Below is search result for **brew search jdk** command.

    ```
    $ brew search jdk
    ==> Casks
    adoptopenjdk              adoptopenjdk              adoptopenjdk8             adoptopenjdk8             oracle-jdk                oracle-jdk                oracle-jdk-javadoc        oracle-jdk-javadoc        sapmachine-jdk            sapmachine-jdk
    ```

    

4. Now install the jdk version that you need like below. During the installation process, you may encounter some error message like

    **Error: Cask ‘java8’ is unavailable: No Cask with this name exists** or **Error: Cask adoptopenjdk8 exists in multiple taps.**

    ```
    $ brew cask install java8
    Error: Cask 'java8' is unavailable: No Cask with this name exists.
    ```

    ```
    $ brew cask install adoptopenjdk8
    Error: Cask adoptopenjdk8 exists in multiple taps:
      homebrew/cask-versions/adoptopenjdk8
      caskroom/versions/adoptopenjdk8
    ```

    

5. **Below is the correct command to install jdk 8 use home brew cask command** 

    [`$ brew cask install homebrew/cask-versions/adoptopenjdk8`]()

     You can also run [`$ brew cask install java`]() to install the newest jdk version. 

    In this example, i had installed the newest jdk version 12.0.1.

    ```
    $ brew cask install homebrew/cask-versions/adoptopenjdk8
    ==> Satisfying dependencies
    ==> Downloading https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/download/jdk8u212-b03/OpenJDK8U-jdk_x64_mac_hotspot_8u212b03.pkg
    ==> Downloading from https://github-production-release-asset-2e65be.s3.amazonaws.com/140418865/07e4b900-61d1-11e9-96f2-868c40733c49?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20190603%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=2019
    ######################################################################## 100.0%
    ==> Verifying SHA-256 checksum for Cask 'adoptopenjdk8'.
    ==> Installing Cask adoptopenjdk8
    ==> Running installer for adoptopenjdk8; your password may be necessary.
    ==> Package installers may write to any location; options such as --appdir are ignored.
    Password:
    installer: Package name is AdoptOpenJDK
    installer: Installing at base path /
    installer: The install was successful.
    🍺  adoptopenjdk8 was successfully installed!
    ```

    

6. After install you can first run `/usr/libexec/java_home` command to get the java home directory, then go to the jdk home directory to see all the installed jdk.

    ```
    # Get the java home directory info.
    $ /usr/libexec/java_home 
    /Library/Java/JavaVirtualMachines/jdk-12.0.1.jdk/Contents/Home
    # List all the installed jdk in java home directory.
    $ ls -l /Library/Java/JavaVirtualMachines/
    total 0
    drwxr-xr-x  3 root      wheel  96 Jun  3 11:19 adoptopenjdk-8.jdk
    drwxr-xr-x  3 root      wheel  96 May  3 22:31 jdk-12.0.1.jdk
    drwxr-xr-x@ 3 songzhao  staff  96 Apr  2 16:23 openjdk-12.0.1.jdk
    ```

    

7. From above output we can see that there are three java jdk that has been installed, two open jdk and one standard jdk. Run each jdk’s java executable command, you can get below output.

    ```
    $ ./openjdk-12.0.1.jdk/Contents/Home/bin/java -version
    openjdk version "12.0.1" 2019-04-16
    OpenJDK Runtime Environment (build 12.0.1+12)
    OpenJDK 64-Bit Server VM (build 12.0.1+12, mixed mode, sharing)
    $ ./adoptopenjdk-8.jdk/Contents/Home/bin/java -version
    openjdk version "1.8.0_212"
    OpenJDK Runtime Environment (AdoptOpenJDK)(build 1.8.0_212-b03)
    OpenJDK 64-Bit Server VM (AdoptOpenJDK)(build 25.212-b03, mixed mode)
    $ ./jdk-12.0.1.jdk/Contents/Home/bin/java -version
    java version "12.0.1" 2019-04-16
    Java(TM) SE Runtime Environment (build 12.0.1+12)
    Java HotSpot(TM) 64-Bit Server VM (build 12.0.1+12, mixed mode, sharing)
    ```

    

#### 1.2 Use Brew Cask Command To UnInstall JDK.

1. Run home brew cask command`$ brew cask uninstall java`to uninstall open jdk 12.0.1. 

    If you want to uninstall open jdk 8 then run`$ brew cask uninstall caskroom/versions/adoptopenjdk8`

    **Below command uninstall open jdk 12.0.1.**

    ```
    $ brew cask uninstall java
    ==> Uninstalling Cask java
    ==> Backing Generic Artifact 'openjdk-12.0.1.jdk' up to '/usr/local/Caskroom/java/12.0.1,69cfe15208a647278a19ef0990eea691/jdk-12.0.1.jdk'.
    Password:
    ==> Removing Generic Artifact '/Library/Java/JavaVirtualMachines/openjdk-12.0.1.jdk'.
    ==> Removing directories if empty:
    /Library/Java/JavaVirtualMachines
    ==> Purging files for version 12.0.1,69cfe15208a647278a19ef0990eea691 of Cask java
    ```

    **Below command uninstall open jdk 8.**

    ```
    $ brew cask uninstall caskroom/versions/adoptopenjdk8
    ==> Uninstalling Cask adoptopenjdk8
    ==> Uninstalling packages:
    net.adoptopenjdk.8.jdk
    Password:
    ==> Purging files for version 8,212:b03 of Cask adoptopenjdk8
    ```

    During above jdk uninstall process, you may encounter below error, **Error: Cask adoptopenjdk8 exists in multiple taps**. 

    This is because you should uninstall **caskroom/versions/adoptopenjdk8** instead of **adoptopenjdk8**.

    ```
    $ brew cask uninstall adoptopenjdk8
    Error: Cask adoptopenjdk8 exists in multiple taps:
      homebrew/cask-versions/adoptopenjdk8
      caskroom/versions/adoptopenjdk8
    ```

2. Now go to jdk installation directory, you will find above two home brew installed jdk directory has been removed.

    ```
    $ ls -l /Library/Java/JavaVirtualMachines/
    total 0
    drwxr-xr-x  3 root  wheel  96 May  3 22:31 jdk-12.0.1.jdk
    ```

    

### 2. Install & Uninstall JDK In Mac OS Manually.

#### 2.1 Install JDK Manually In Mac OS X.

1. Download related jdk from [oracle jdk download page](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html). You should have an oracle account to login before download start.
    ![jdk download page](assets/jdk-download-page.png)

2. Double click the downloaded dmg file to install jdk, just follow the wizard to install it.

3. When the installation complete, you can find the jdk install directory in folder **/Library/Java/JavaVirtualMachines/**. 

    From below output, we can see there are three jdk has been installed, one ( adoptopenjdk-8.jdk ) is installed with home brew, the other two ( jdk-12.0.1.jdk, jdk1.8.0_211.jdk ) are installed by download installation file from oracle.

    ```
    $ ls -l /Library/Java/JavaVirtualMachines/
    total 0
    drwxr-xr-x  3 root  wheel  96 Jun  3 14:02 adoptopenjdk-8.jdk
    drwxr-xr-x  3 root  wheel  96 May  3 22:31 jdk-12.0.1.jdk
    drwxr-xr-x  3 root  wheel  96 Jun  3 15:54 jdk1.8.0_211.jdk
    ```

    

#### 2.2 Uninstall Java JDK Manually In Mac OS X.

Follow oracle’s documents, to manually uninstall installed jdk in mac os x, you just need to remove some files with root permission in terminal like below.

1. Open a terminal and run below command to remove java jdk installed directory.

    ```
    $ sudo rm -rf /Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk
    ```

    ```
    $ ls -l /Library/Java/JavaVirtualMachines/
    total 0
    drwxr-xr-x  3 root  wheel  96 Jun  3 14:02 adoptopenjdk-8.jdk
    drwxr-xr-x  3 root  wheel  96 May  3 22:31 jdk-12.0.1.jdk
    ```

2. Run below command to remove java control panel if exist.

    ```
    $ sudo rm -rf /Library/PreferencePanes/JavaControlPanel.prefPane
    ```

3. Remove java applet plugins.

    ```
    $ sudo rm -rf /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin/
    ```

4. Remove java application support.

    ```
    $ sudo rm -rf ~/Library/Application\ Support/Java
    ```

5. Remove java updater list.

    ```
    $ sudo rm -rf /Library/LaunchAgents/com.oracle.java.Java-Updater.plist
    $ sudo rm -rf /Library/PrivilegedHelperTools/com.oracle.java.JavaUpdateHelper
    ```

6. Remove java helper tool.

    ```
    $ sudo rm -rf /Library/LaunchDaemons/com.oracle.java.Helper-Tool.plist
    ```

    ```
    $ sudo rm -rf /Library/Preferences/com.oracle.java.Helper-Tool.plist
    ```

### 3. Set JAVA_HOME & PATH System Environment Variable.

Now we have known how to install / uninstall multiple java jdk versions on mac os. But after that you need to set **JAVA_HOME** & **PATH** environment variable value to set your installed jdk as default jdk. So that you can use it easily.

1. Go to user home directory.

2. Run`$ nano .bash_profile` command to open **.bash_profile** file to edit.

3. Insert below export command in **.bash_profile** file.

    ```
    # Set JAVA_HOME system environment variable value.
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
    
    # Add java bin folder in PATH system environment variable value.
    export PATH=$PATH:$JAVA_HOME/bin
    ```

4. Save the above changes and quit editor.

5. Restart terminal and use command `$ java -version` to see the new jdk version is used by output info.

    ```
    $ java -version
    openjdk version "1.8.0_212"
    OpenJDK Runtime Environment (AdoptOpenJDK)(build 1.8.0_212-b03)
    OpenJDK 64-Bit Server VM (AdoptOpenJDK)(build 25.212-b03, mixed mode)
    ```



---

